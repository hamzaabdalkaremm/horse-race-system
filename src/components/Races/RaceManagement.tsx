import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useData } from '@/hooks/useData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Eye, Calendar, MapPin, Trophy, Users } from 'lucide-react';
import { Race } from '@/types';

const RaceManagement: React.FC = () => {
  const { races, addRace, updateRace } = useData();
  const { user } = useAuth();
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    distance: '',
    ageCategory: '',
    maxHorses: '',
    prize: '',
    location: '',
    description: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const raceData = {
      name: formData.name,
      date: formData.date,
      time: formData.time,
      distance: parseInt(formData.distance),
      ageCategory: formData.ageCategory,
      maxHorses: parseInt(formData.maxHorses),
      registeredHorses: selectedRace?.registeredHorses || [],
      status: 'upcoming' as const,
      prize: parseInt(formData.prize),
      location: formData.location,
      organizerId: user.id,
      organizerName: user.name
    };

    if (selectedRace) {
      updateRace(selectedRace.id, raceData);
      toast({
        title: "تم تحديث السباق بنجاح",
        description: "تم حفظ التعديلات على السباق"
      });
    } else {
      addRace(raceData);
      toast({
        title: "تم إنشاء السباق بنجاح",
        description: "تم إضافة السباق الجديد إلى النظام"
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      date: '',
      time: '',
      distance: '',
      ageCategory: '',
      maxHorses: '',
      prize: '',
      location: '',
      description: ''
    });
    setSelectedRace(null);
  };

  const handleEdit = (race: Race) => {
    setSelectedRace(race);
    setFormData({
      name: race.name,
      date: race.date,
      time: race.time,
      distance: race.distance.toString(),
      ageCategory: race.ageCategory,
      maxHorses: race.maxHorses.toString(),
      prize: race.prize.toString(),
      location: race.location,
      description: ''
    });
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      upcoming: { label: 'قادم', variant: 'default' as const },
      active: { label: 'نشط', variant: 'default' as const },
      completed: { label: 'مكتمل', variant: 'secondary' as const },
      cancelled: { label: 'ملغي', variant: 'destructive' as const }
    };
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return <Badge variant={statusInfo.variant} data-id="q9w6ozkeu" data-path="src/components/Races/RaceManagement.tsx">{statusInfo.label}</Badge>;
  };

  return (
    <div className="p-6 space-y-6" dir="rtl" data-id="akpmdm5z0" data-path="src/components/Races/RaceManagement.tsx">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between" data-id="81d7j6ery" data-path="src/components/Races/RaceManagement.tsx">
        <div data-id="89katbmgy" data-path="src/components/Races/RaceManagement.tsx">
          <h1 className="text-3xl font-bold text-gray-900" data-id="913r2exa4" data-path="src/components/Races/RaceManagement.tsx">إدارة السباقات</h1>
          <p className="text-gray-600 mt-2" data-id="7vnj2rlja" data-path="src/components/Races/RaceManagement.tsx">إنشاء وإدارة سباقات الخيل</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} data-id="g0wia6xdu" data-path="src/components/Races/RaceManagement.tsx">
          <DialogTrigger asChild data-id="m873n129e" data-path="src/components/Races/RaceManagement.tsx">
            <Button onClick={resetForm} className="mt-4 md:mt-0" data-id="q9g799z49" data-path="src/components/Races/RaceManagement.tsx">
              <Plus className="h-4 w-4 ml-2" data-id="pedzat03f" data-path="src/components/Races/RaceManagement.tsx" />
              إضافة سباق جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-id="65j7g8ssn" data-path="src/components/Races/RaceManagement.tsx">
            <DialogHeader data-id="k3vcbdjcd" data-path="src/components/Races/RaceManagement.tsx">
              <DialogTitle data-id="nu0al1hti" data-path="src/components/Races/RaceManagement.tsx">
                {selectedRace ? 'تعديل السباق' : 'إضافة سباق جديد'}
              </DialogTitle>
              <DialogDescription data-id="dgcao3xl5" data-path="src/components/Races/RaceManagement.tsx">
                {selectedRace ? 'تحديث بيانات السباق' : 'إنشاء سباق جديد في النظام'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4" data-id="vvxzy810l" data-path="src/components/Races/RaceManagement.tsx">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="4vbm5mq6s" data-path="src/components/Races/RaceManagement.tsx">
                <div className="space-y-2" data-id="u23ljx492" data-path="src/components/Races/RaceManagement.tsx">
                  <Label htmlFor="name" data-id="otjjdf206" data-path="src/components/Races/RaceManagement.tsx">اسم السباق</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="أدخل اسم السباق"
                    required data-id="ka9tga0n1" data-path="src/components/Races/RaceManagement.tsx" />

                </div>
                <div className="space-y-2" data-id="4r3gwatlt" data-path="src/components/Races/RaceManagement.tsx">
                  <Label htmlFor="location" data-id="4kuqonsm7" data-path="src/components/Races/RaceManagement.tsx">مكان السباق</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="أدخل مكان السباق"
                    required data-id="z3i036g53" data-path="src/components/Races/RaceManagement.tsx" />

                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="lravttbyt" data-path="src/components/Races/RaceManagement.tsx">
                <div className="space-y-2" data-id="uwmchrzeo" data-path="src/components/Races/RaceManagement.tsx">
                  <Label htmlFor="date" data-id="zun5bhmwb" data-path="src/components/Races/RaceManagement.tsx">تاريخ السباق</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required data-id="aqfyyhj7k" data-path="src/components/Races/RaceManagement.tsx" />

                </div>
                <div className="space-y-2" data-id="4tfimegtq" data-path="src/components/Races/RaceManagement.tsx">
                  <Label htmlFor="time" data-id="gbi2seics" data-path="src/components/Races/RaceManagement.tsx">وقت السباق</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    required data-id="7rv0yhbu2" data-path="src/components/Races/RaceManagement.tsx" />

                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-id="n291kyvfm" data-path="src/components/Races/RaceManagement.tsx">
                <div className="space-y-2" data-id="5fwj3lok5" data-path="src/components/Races/RaceManagement.tsx">
                  <Label htmlFor="distance" data-id="j6r1hyovr" data-path="src/components/Races/RaceManagement.tsx">المسافة (متر)</Label>
                  <Input
                    id="distance"
                    type="number"
                    value={formData.distance}
                    onChange={(e) => handleInputChange('distance', e.target.value)}
                    placeholder="2000"
                    required data-id="eiuntoq7l" data-path="src/components/Races/RaceManagement.tsx" />

                </div>
                <div className="space-y-2" data-id="h946f42g5" data-path="src/components/Races/RaceManagement.tsx">
                  <Label htmlFor="maxHorses" data-id="9lql1neby" data-path="src/components/Races/RaceManagement.tsx">الحد الأقصى للخيول</Label>
                  <Input
                    id="maxHorses"
                    type="number"
                    value={formData.maxHorses}
                    onChange={(e) => handleInputChange('maxHorses', e.target.value)}
                    placeholder="12"
                    required data-id="htwur2om4" data-path="src/components/Races/RaceManagement.tsx" />

                </div>
                <div className="space-y-2" data-id="x4iywwa5l" data-path="src/components/Races/RaceManagement.tsx">
                  <Label htmlFor="prize" data-id="e0hs0xiur" data-path="src/components/Races/RaceManagement.tsx">قيمة الجائزة (ريال)</Label>
                  <Input
                    id="prize"
                    type="number"
                    value={formData.prize}
                    onChange={(e) => handleInputChange('prize', e.target.value)}
                    placeholder="100000"
                    required data-id="kroq4x2rr" data-path="src/components/Races/RaceManagement.tsx" />

                </div>
              </div>

              <div className="space-y-2" data-id="vkkqz8o8p" data-path="src/components/Races/RaceManagement.tsx">
                <Label htmlFor="ageCategory" data-id="32ua3lk2h" data-path="src/components/Races/RaceManagement.tsx">فئة العمر</Label>
                <Select
                  value={formData.ageCategory}
                  onValueChange={(value) => handleInputChange('ageCategory', value)} data-id="t41ge9aur" data-path="src/components/Races/RaceManagement.tsx">

                  <SelectTrigger data-id="lnoabmx4r" data-path="src/components/Races/RaceManagement.tsx">
                    <SelectValue placeholder="اختر فئة العمر" data-id="ym8nsjdag" data-path="src/components/Races/RaceManagement.tsx" />
                  </SelectTrigger>
                  <SelectContent data-id="68cz7d00v" data-path="src/components/Races/RaceManagement.tsx">
                    <SelectItem value="2-3 سنوات" data-id="jplubidsv" data-path="src/components/Races/RaceManagement.tsx">2-3 سنوات</SelectItem>
                    <SelectItem value="3-4 سنوات" data-id="9x5yuybj3" data-path="src/components/Races/RaceManagement.tsx">3-4 سنوات</SelectItem>
                    <SelectItem value="4-5 سنوات" data-id="jad07xm0a" data-path="src/components/Races/RaceManagement.tsx">4-5 سنوات</SelectItem>
                    <SelectItem value="4 سنوات فما فوق" data-id="6zrgt2ntr" data-path="src/components/Races/RaceManagement.tsx">4 سنوات فما فوق</SelectItem>
                    <SelectItem value="5 سنوات فما فوق" data-id="y5vwm8oqs" data-path="src/components/Races/RaceManagement.tsx">5 سنوات فما فوق</SelectItem>
                    <SelectItem value="جميع الأعمار" data-id="ptcxk8fgt" data-path="src/components/Races/RaceManagement.tsx">جميع الأعمار</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2 pt-4" data-id="5a9tehye5" data-path="src/components/Races/RaceManagement.tsx">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} data-id="b99o56yph" data-path="src/components/Races/RaceManagement.tsx">
                  إلغاء
                </Button>
                <Button type="submit" data-id="4auyg30ji" data-path="src/components/Races/RaceManagement.tsx">
                  {selectedRace ? 'تحديث السباق' : 'إنشاء السباق'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6" data-id="pzrcma7zc" data-path="src/components/Races/RaceManagement.tsx">
        {races.map((race) =>
        <Card key={race.id} className="hover:shadow-lg transition-shadow" data-id="3a4klvwmn" data-path="src/components/Races/RaceManagement.tsx">
            <CardHeader data-id="w53aetvmv" data-path="src/components/Races/RaceManagement.tsx">
              <div className="flex items-start justify-between" data-id="9v1m4d7pu" data-path="src/components/Races/RaceManagement.tsx">
                <div data-id="6bsgh8sym" data-path="src/components/Races/RaceManagement.tsx">
                  <CardTitle className="text-xl" data-id="ukdje2zuv" data-path="src/components/Races/RaceManagement.tsx">{race.name}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2" data-id="wratn1np9" data-path="src/components/Races/RaceManagement.tsx">
                    <span className="flex items-center gap-1" data-id="ry4fo6rm5" data-path="src/components/Races/RaceManagement.tsx">
                      <Calendar className="h-4 w-4" data-id="zmzfxu1uv" data-path="src/components/Races/RaceManagement.tsx" />
                      {new Date(race.date).toLocaleDateString('ar-SA')} - {race.time}
                    </span>
                    <span className="flex items-center gap-1" data-id="t9ybdletn" data-path="src/components/Races/RaceManagement.tsx">
                      <MapPin className="h-4 w-4" data-id="m60qfdua8" data-path="src/components/Races/RaceManagement.tsx" />
                      {race.location}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2" data-id="zroayzejq" data-path="src/components/Races/RaceManagement.tsx">
                  {getStatusBadge(race.status)}
                  <Button variant="outline" size="sm" onClick={() => handleEdit(race)} data-id="0estws8o4" data-path="src/components/Races/RaceManagement.tsx">
                    <Edit className="h-4 w-4" data-id="vz1fqdj8y" data-path="src/components/Races/RaceManagement.tsx" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent data-id="xshrspets" data-path="src/components/Races/RaceManagement.tsx">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-id="vgfwvrt59" data-path="src/components/Races/RaceManagement.tsx">
                <div className="text-center p-3 bg-blue-50 rounded-lg" data-id="en3ucclxp" data-path="src/components/Races/RaceManagement.tsx">
                  <div className="text-2xl font-bold text-blue-600" data-id="7wdo74ro1" data-path="src/components/Races/RaceManagement.tsx">{race.distance}م</div>
                  <div className="text-sm text-gray-600" data-id="5rif0pvjh" data-path="src/components/Races/RaceManagement.tsx">المسافة</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg" data-id="rrxee0rkv" data-path="src/components/Races/RaceManagement.tsx">
                  <div className="text-2xl font-bold text-green-600" data-id="jprrrop4m" data-path="src/components/Races/RaceManagement.tsx">
                    {race.registeredHorses.length}/{race.maxHorses}
                  </div>
                  <div className="text-sm text-gray-600" data-id="esflhxruv" data-path="src/components/Races/RaceManagement.tsx">الخيول المسجلة</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg" data-id="s5a2kpdfj" data-path="src/components/Races/RaceManagement.tsx">
                  <div className="text-2xl font-bold text-purple-600" data-id="9wws3505h" data-path="src/components/Races/RaceManagement.tsx">
                    {race.prize.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600" data-id="15j3j6j5q" data-path="src/components/Races/RaceManagement.tsx">قيمة الجائزة</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg" data-id="ryk0s6hx9" data-path="src/components/Races/RaceManagement.tsx">
                  <div className="text-sm font-bold text-orange-600" data-id="u5il5dd5s" data-path="src/components/Races/RaceManagement.tsx">{race.ageCategory}</div>
                  <div className="text-sm text-gray-600" data-id="gu4y370rx" data-path="src/components/Races/RaceManagement.tsx">فئة العمر</div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between" data-id="u0rk2rh1b" data-path="src/components/Races/RaceManagement.tsx">
                <div className="text-sm text-gray-600" data-id="vmx08lk5x" data-path="src/components/Races/RaceManagement.tsx">
                  منظم بواسطة: {race.organizerName}
                </div>
                <div className="flex gap-2" data-id="7huw25j3t" data-path="src/components/Races/RaceManagement.tsx">
                  <Button variant="outline" size="sm" data-id="pfr626lwg" data-path="src/components/Races/RaceManagement.tsx">
                    <Eye className="h-4 w-4 ml-1" data-id="5qytgmu2i" data-path="src/components/Races/RaceManagement.tsx" />
                    عرض التفاصيل
                  </Button>
                  <Button variant="outline" size="sm" data-id="ma1iki8f0" data-path="src/components/Races/RaceManagement.tsx">
                    <Users className="h-4 w-4 ml-1" data-id="b3p51lqgb" data-path="src/components/Races/RaceManagement.tsx" />
                    الخيول المسجلة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {races.length === 0 &&
        <Card data-id="9t0pj9xpm" data-path="src/components/Races/RaceManagement.tsx">
            <CardContent className="text-center py-12" data-id="mcrcgg88o" data-path="src/components/Races/RaceManagement.tsx">
              <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" data-id="h67rsfihb" data-path="src/components/Races/RaceManagement.tsx" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2" data-id="xvxg0qogl" data-path="src/components/Races/RaceManagement.tsx">لا توجد سباقات</h3>
              <p className="text-gray-600 mb-4" data-id="gqmgo5k4t" data-path="src/components/Races/RaceManagement.tsx">ابدأ بإنشاء سباقك الأول</p>
              <Button onClick={() => setIsDialogOpen(true)} data-id="h00wtb191" data-path="src/components/Races/RaceManagement.tsx">
                <Plus className="h-4 w-4 ml-2" data-id="26mvcdi9y" data-path="src/components/Races/RaceManagement.tsx" />
                إنشاء سباق جديد
              </Button>
            </CardContent>
          </Card>
        }
      </div>
    </div>);

};

export default RaceManagement;