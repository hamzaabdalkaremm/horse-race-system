import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useData } from '@/hooks/useData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Calendar, MapPin, Trophy, Users, AlertCircle, CheckCircle } from 'lucide-react';

const HorseRegistration: React.FC = () => {
  const { races, horses, registerHorseToRace } = useData();
  const { user } = useAuth();
  const [selectedRace, setSelectedRace] = useState<string>('');
  const [selectedHorse, setSelectedHorse] = useState<string>('');

  const availableRaces = races.filter((race) => race.status === 'upcoming');
  const userHorses = horses.filter((horse) => horse.ownerId === user?.id);

  const checkEligibility = (raceId: string, horseId: string) => {
    const race = races.find((r) => r.id === raceId);
    const horse = horses.find((h) => h.id === horseId);

    if (!race || !horse) return { eligible: false, reasons: ['بيانات غير صحيحة'] };

    const reasons = [];

    // Check if race is full
    if (race.registeredHorses.length >= race.maxHorses) {
      reasons.push('السباق مكتمل العدد');
    }

    // Check if horse is already registered
    if (race.registeredHorses.includes(horseId)) {
      reasons.push('الحصان مسجل مسبقاً في هذا السباق');
    }

    // Check age eligibility
    const ageCategory = race.ageCategory;
    if (ageCategory.includes('2-3') && (horse.age < 2 || horse.age > 3)) {
      reasons.push('الحصان لا يتوافق مع فئة العمر المطلوبة');
    } else if (ageCategory.includes('3-4') && (horse.age < 3 || horse.age > 4)) {
      reasons.push('الحصان لا يتوافق مع فئة العمر المطلوبة');
    } else if (ageCategory.includes('4-5') && (horse.age < 4 || horse.age > 5)) {
      reasons.push('الحصان لا يتوافق مع فئة العمر المطلوبة');
    } else if (ageCategory.includes('4 سنوات فما فوق') && horse.age < 4) {
      reasons.push('الحصان لا يتوافق مع فئة العمر المطلوبة');
    } else if (ageCategory.includes('5 سنوات فما فوق') && horse.age < 5) {
      reasons.push('الحصان لا يتوافق مع فئة العمر المطلوبة');
    }

    return {
      eligible: reasons.length === 0,
      reasons
    };
  };

  const handleRegistration = () => {
    if (!selectedRace || !selectedHorse) {
      toast({
        title: "خطأ في التسجيل",
        description: "يرجى اختيار السباق والحصان",
        variant: "destructive"
      });
      return;
    }

    const eligibility = checkEligibility(selectedRace, selectedHorse);

    if (!eligibility.eligible) {
      toast({
        title: "غير مؤهل للتسجيل",
        description: eligibility.reasons.join(', '),
        variant: "destructive"
      });
      return;
    }

    const success = registerHorseToRace(selectedRace, selectedHorse);

    if (success) {
      const race = races.find((r) => r.id === selectedRace);
      const horse = horses.find((h) => h.id === selectedHorse);

      toast({
        title: "تم التسجيل بنجاح",
        description: `تم تسجيل ${horse?.name} في سباق ${race?.name}`
      });

      setSelectedRace('');
      setSelectedHorse('');
    } else {
      toast({
        title: "فشل في التسجيل",
        description: "حدث خطأ أثناء تسجيل الحصان",
        variant: "destructive"
      });
    }
  };

  const getRegistrationStatus = () => {
    if (!selectedRace || !selectedHorse) return null;

    const eligibility = checkEligibility(selectedRace, selectedHorse);
    return eligibility;
  };

  const registrationStatus = getRegistrationStatus();

  return (
    <div className="p-6 space-y-6" dir="rtl" data-id="ypjvognvp" data-path="src/components/Registration/HorseRegistration.tsx">
      <div data-id="u1ohn7qnh" data-path="src/components/Registration/HorseRegistration.tsx">
        <h1 className="text-3xl font-bold text-gray-900" data-id="qorki3hxg" data-path="src/components/Registration/HorseRegistration.tsx">تسجيل الخيول في السباقات</h1>
        <p className="text-gray-600 mt-2" data-id="ktvpiozs1" data-path="src/components/Registration/HorseRegistration.tsx">سجل خيولك في السباقات المتاحة</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2" data-id="heydqneh5" data-path="src/components/Registration/HorseRegistration.tsx">
        <Card data-id="43ce36svo" data-path="src/components/Registration/HorseRegistration.tsx">
          <CardHeader data-id="g6f7k6fmv" data-path="src/components/Registration/HorseRegistration.tsx">
            <CardTitle data-id="p30s57egm" data-path="src/components/Registration/HorseRegistration.tsx">تسجيل جديد</CardTitle>
            <CardDescription data-id="0axapzqfo" data-path="src/components/Registration/HorseRegistration.tsx">اختر السباق والحصان للتسجيل</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4" data-id="opsyh6bha" data-path="src/components/Registration/HorseRegistration.tsx">
            <div className="space-y-2" data-id="4ge7zram5" data-path="src/components/Registration/HorseRegistration.tsx">
              <label className="text-sm font-medium" data-id="8t2mdw5fv" data-path="src/components/Registration/HorseRegistration.tsx">اختر السباق</label>
              <Select value={selectedRace} onValueChange={setSelectedRace} data-id="2jgdq06df" data-path="src/components/Registration/HorseRegistration.tsx">
                <SelectTrigger data-id="8i73e1ig6" data-path="src/components/Registration/HorseRegistration.tsx">
                  <SelectValue placeholder="اختر السباق" data-id="45b7oxt6t" data-path="src/components/Registration/HorseRegistration.tsx" />
                </SelectTrigger>
                <SelectContent data-id="x6m3yk7a6" data-path="src/components/Registration/HorseRegistration.tsx">
                  {availableRaces.map((race) =>
                  <SelectItem key={race.id} value={race.id} data-id="uixnkxkzn" data-path="src/components/Registration/HorseRegistration.tsx">
                      <div className="flex items-center justify-between w-full" data-id="vais1x6xb" data-path="src/components/Registration/HorseRegistration.tsx">
                        <span data-id="vdjbufkvm" data-path="src/components/Registration/HorseRegistration.tsx">{race.name}</span>
                        <Badge variant="outline" className="mr-2" data-id="ivzvvk9a2" data-path="src/components/Registration/HorseRegistration.tsx">
                          {race.registeredHorses.length}/{race.maxHorses}
                        </Badge>
                      </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2" data-id="h9l80tjxq" data-path="src/components/Registration/HorseRegistration.tsx">
              <label className="text-sm font-medium" data-id="95duthuis" data-path="src/components/Registration/HorseRegistration.tsx">اختر الحصان</label>
              <Select value={selectedHorse} onValueChange={setSelectedHorse} data-id="jjm38akf9" data-path="src/components/Registration/HorseRegistration.tsx">
                <SelectTrigger data-id="94lb0qqar" data-path="src/components/Registration/HorseRegistration.tsx">
                  <SelectValue placeholder="اختر الحصان" data-id="8tk96j7dv" data-path="src/components/Registration/HorseRegistration.tsx" />
                </SelectTrigger>
                <SelectContent data-id="3phee7bvx" data-path="src/components/Registration/HorseRegistration.tsx">
                  {userHorses.map((horse) =>
                  <SelectItem key={horse.id} value={horse.id} data-id="ai6cvlgpu" data-path="src/components/Registration/HorseRegistration.tsx">
                      <div className="flex items-center justify-between w-full" data-id="k3ph8k13y" data-path="src/components/Registration/HorseRegistration.tsx">
                        <span data-id="bchlm6lsq" data-path="src/components/Registration/HorseRegistration.tsx">{horse.name}</span>
                        <span className="text-sm text-gray-500 mr-2" data-id="em8zs244p" data-path="src/components/Registration/HorseRegistration.tsx">
                          {horse.breed} - {horse.age} سنوات
                        </span>
                      </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {registrationStatus &&
            <Alert variant={registrationStatus.eligible ? "default" : "destructive"} data-id="92l7vmmxx" data-path="src/components/Registration/HorseRegistration.tsx">
                <AlertCircle className="h-4 w-4" data-id="df3114zn9" data-path="src/components/Registration/HorseRegistration.tsx" />
                <AlertDescription data-id="4kj9r73t1" data-path="src/components/Registration/HorseRegistration.tsx">
                  {registrationStatus.eligible ?
                <div className="flex items-center gap-2" data-id="72e0b3ylc" data-path="src/components/Registration/HorseRegistration.tsx">
                      <CheckCircle className="h-4 w-4 text-green-600" data-id="yq8ralm89" data-path="src/components/Registration/HorseRegistration.tsx" />
                      <span data-id="40vzcu0j7" data-path="src/components/Registration/HorseRegistration.tsx">الحصان مؤهل للتسجيل في هذا السباق</span>
                    </div> :

                <div data-id="hb2a9h5d6" data-path="src/components/Registration/HorseRegistration.tsx">
                      <strong data-id="tmh71iocu" data-path="src/components/Registration/HorseRegistration.tsx">أسباب عدم الأهلية:</strong>
                      <ul className="list-disc list-inside mt-1" data-id="e3fgone9t" data-path="src/components/Registration/HorseRegistration.tsx">
                        {registrationStatus.reasons.map((reason, index) =>
                    <li key={index} data-id="m4emrialp" data-path="src/components/Registration/HorseRegistration.tsx">{reason}</li>
                    )}
                      </ul>
                    </div>
                }
                </AlertDescription>
              </Alert>
            }

            <Button
              onClick={handleRegistration}
              className="w-full"
              disabled={!registrationStatus?.eligible} data-id="cty6kkpy8" data-path="src/components/Registration/HorseRegistration.tsx">

              تسجيل الحصان
            </Button>
          </CardContent>
        </Card>

        <Card data-id="gav7ky5jz" data-path="src/components/Registration/HorseRegistration.tsx">
          <CardHeader data-id="xhkl69mck" data-path="src/components/Registration/HorseRegistration.tsx">
            <CardTitle data-id="b78xsxtug" data-path="src/components/Registration/HorseRegistration.tsx">معلومات السباق المختار</CardTitle>
            <CardDescription data-id="cfehry3yy" data-path="src/components/Registration/HorseRegistration.tsx">تفاصيل السباق وشروط التسجيل</CardDescription>
          </CardHeader>
          <CardContent data-id="iwoxi1tkg" data-path="src/components/Registration/HorseRegistration.tsx">
            {selectedRace ?
            <div className="space-y-4" data-id="iki6fy8se" data-path="src/components/Registration/HorseRegistration.tsx">
                {(() => {
                const race = races.find((r) => r.id === selectedRace);
                return race ?
                <>
                      <div data-id="qij7f1lxx" data-path="src/components/Registration/HorseRegistration.tsx">
                        <h3 className="font-semibold text-lg" data-id="hiezcm276" data-path="src/components/Registration/HorseRegistration.tsx">{race.name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600" data-id="jqlicysrb" data-path="src/components/Registration/HorseRegistration.tsx">
                          <span className="flex items-center gap-1" data-id="xsntmnsfz" data-path="src/components/Registration/HorseRegistration.tsx">
                            <Calendar className="h-4 w-4" data-id="3m0kq6tox" data-path="src/components/Registration/HorseRegistration.tsx" />
                            {new Date(race.date).toLocaleDateString('ar-SA')} - {race.time}
                          </span>
                          <span className="flex items-center gap-1" data-id="xgqgzyomu" data-path="src/components/Registration/HorseRegistration.tsx">
                            <MapPin className="h-4 w-4" data-id="tdsvg4hr0" data-path="src/components/Registration/HorseRegistration.tsx" />
                            {race.location}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4" data-id="d6hj1obw6" data-path="src/components/Registration/HorseRegistration.tsx">
                        <div className="p-3 bg-blue-50 rounded-lg text-center" data-id="gcwwfd5b0" data-path="src/components/Registration/HorseRegistration.tsx">
                          <div className="text-2xl font-bold text-blue-600" data-id="2b09dn5to" data-path="src/components/Registration/HorseRegistration.tsx">{race.distance}م</div>
                          <div className="text-sm text-gray-600" data-id="50qd1cftx" data-path="src/components/Registration/HorseRegistration.tsx">المسافة</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg text-center" data-id="3s2l4rgkk" data-path="src/components/Registration/HorseRegistration.tsx">
                          <div className="text-2xl font-bold text-green-600" data-id="j93r2hdy7" data-path="src/components/Registration/HorseRegistration.tsx">
                            {race.registeredHorses.length}/{race.maxHorses}
                          </div>
                          <div className="text-sm text-gray-600" data-id="dqaopuo4q" data-path="src/components/Registration/HorseRegistration.tsx">الخيول المسجلة</div>
                        </div>
                      </div>

                      <div className="space-y-2" data-id="dm4aj17f5" data-path="src/components/Registration/HorseRegistration.tsx">
                        <div className="flex justify-between" data-id="4p552df7s" data-path="src/components/Registration/HorseRegistration.tsx">
                          <span className="text-sm text-gray-600" data-id="s02x8uxa8" data-path="src/components/Registration/HorseRegistration.tsx">فئة العمر:</span>
                          <span className="text-sm font-medium" data-id="b9qzu6v7h" data-path="src/components/Registration/HorseRegistration.tsx">{race.ageCategory}</span>
                        </div>
                        <div className="flex justify-between" data-id="x680xdkjo" data-path="src/components/Registration/HorseRegistration.tsx">
                          <span className="text-sm text-gray-600" data-id="zhy7o7cp4" data-path="src/components/Registration/HorseRegistration.tsx">قيمة الجائزة:</span>
                          <span className="text-sm font-medium" data-id="xqr4172qy" data-path="src/components/Registration/HorseRegistration.tsx">{race.prize.toLocaleString()} ريال</span>
                        </div>
                        <div className="flex justify-between" data-id="asc90o7vf" data-path="src/components/Registration/HorseRegistration.tsx">
                          <span className="text-sm text-gray-600" data-id="9571rnzxd" data-path="src/components/Registration/HorseRegistration.tsx">المنظم:</span>
                          <span className="text-sm font-medium" data-id="7802au9ar" data-path="src/components/Registration/HorseRegistration.tsx">{race.organizerName}</span>
                        </div>
                      </div>
                    </> :
                null;
              })()}
              </div> :

            <div className="text-center py-8" data-id="x2pof3efq" data-path="src/components/Registration/HorseRegistration.tsx">
                <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" data-id="0shwffc4r" data-path="src/components/Registration/HorseRegistration.tsx" />
                <p className="text-gray-500" data-id="21ruetnk9" data-path="src/components/Registration/HorseRegistration.tsx">اختر سباقاً لعرض التفاصيل</p>
              </div>
            }
          </CardContent>
        </Card>
      </div>

      <Card data-id="n9pxgeizz" data-path="src/components/Registration/HorseRegistration.tsx">
        <CardHeader data-id="a9rqa44rt" data-path="src/components/Registration/HorseRegistration.tsx">
          <CardTitle data-id="w6f2wf432" data-path="src/components/Registration/HorseRegistration.tsx">السباقات المتاحة</CardTitle>
          <CardDescription data-id="1dkl6sqo3" data-path="src/components/Registration/HorseRegistration.tsx">جميع السباقات المفتوحة للتسجيل</CardDescription>
        </CardHeader>
        <CardContent data-id="e30if9w3y" data-path="src/components/Registration/HorseRegistration.tsx">
          <div className="space-y-4" data-id="j96lfa46z" data-path="src/components/Registration/HorseRegistration.tsx">
            {availableRaces.map((race) =>
            <div key={race.id} className="flex items-center justify-between p-4 border rounded-lg" data-id="jes0i5g4i" data-path="src/components/Registration/HorseRegistration.tsx">
                <div data-id="9pz4tqbl2" data-path="src/components/Registration/HorseRegistration.tsx">
                  <h3 className="font-semibold" data-id="o9umerllf" data-path="src/components/Registration/HorseRegistration.tsx">{race.name}</h3>
                  <p className="text-sm text-gray-600" data-id="d12el8c6b" data-path="src/components/Registration/HorseRegistration.tsx">
                    {new Date(race.date).toLocaleDateString('ar-SA')} - {race.time}
                  </p>
                  <p className="text-sm text-gray-500" data-id="4m7zxnmjd" data-path="src/components/Registration/HorseRegistration.tsx">{race.location}</p>
                </div>
                <div className="text-left space-y-2" data-id="nooijxm62" data-path="src/components/Registration/HorseRegistration.tsx">
                  <Badge variant="secondary" data-id="91hhbtrbh" data-path="src/components/Registration/HorseRegistration.tsx">
                    {race.registeredHorses.length}/{race.maxHorses}
                  </Badge>
                  <div className="text-sm text-gray-600" data-id="81xs6aifq" data-path="src/components/Registration/HorseRegistration.tsx">{race.distance}م</div>
                  <div className="text-sm text-gray-600" data-id="dj49gd1ag" data-path="src/components/Registration/HorseRegistration.tsx">{race.ageCategory}</div>
                </div>
              </div>
            )}
            
            {availableRaces.length === 0 &&
            <div className="text-center py-8" data-id="fl9gnnve5" data-path="src/components/Registration/HorseRegistration.tsx">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" data-id="vffs7wepe" data-path="src/components/Registration/HorseRegistration.tsx" />
                <p className="text-gray-500" data-id="xso6am4ic" data-path="src/components/Registration/HorseRegistration.tsx">لا توجد سباقات متاحة للتسجيل حالياً</p>
              </div>
            }
          </div>
        </CardContent>
      </Card>
    </div>);

};

export default HorseRegistration;