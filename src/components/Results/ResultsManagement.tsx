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
import { Plus, Trophy, Medal, Clock, User, Award, Eye } from 'lucide-react';
import { RaceResult } from '@/types';

const ResultsManagement: React.FC = () => {
  const { races, horses, results, addResult } = useData();
  const { user, hasRole } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRace, setSelectedRace] = useState<string>('');
  const [raceResults, setRaceResults] = useState<Array<{
    horseId: string;
    position: number;
    time: string;
    jockeyName: string;
    penalties?: string;
    notes?: string;
  }>>([]);

  const completedRaces = races.filter((race) => race.status === 'completed');
  const availableRaces = races.filter((race) =>
  race.status === 'upcoming' || race.status === 'active'
  );

  const handleRaceSelect = (raceId: string) => {
    setSelectedRace(raceId);
    const race = races.find((r) => r.id === raceId);
    if (race) {
      const registeredHorses = horses.filter((h) => race.registeredHorses.includes(h.id));
      setRaceResults(registeredHorses.map((horse, index) => ({
        horseId: horse.id,
        position: index + 1,
        time: '',
        jockeyName: '',
        penalties: '',
        notes: ''
      })));
    }
  };

  const updateResult = (index: number, field: string, value: string | number) => {
    setRaceResults((prev) => prev.map((result, i) =>
    i === index ? { ...result, [field]: value } : result
    ));
  };

  const handleSubmitResults = () => {
    if (!selectedRace || !user) return;

    const race = races.find((r) => r.id === selectedRace);
    if (!race) return;

    // Validate all results have required fields
    const invalidResults = raceResults.filter((result) =>
    !result.time || !result.jockeyName
    );

    if (invalidResults.length > 0) {
      toast({
        title: "بيانات غير مكتملة",
        description: "يرجى إدخال الوقت واسم الفارس لجميع الخيول",
        variant: "destructive"
      });
      return;
    }

    // Sort by position and save results
    const sortedResults = [...raceResults].sort((a, b) => a.position - b.position);

    sortedResults.forEach((result) => {
      const horse = horses.find((h) => h.id === result.horseId);
      if (horse) {
        addResult({
          raceId: selectedRace,
          raceName: race.name,
          horseId: result.horseId,
          horseName: horse.name,
          position: result.position,
          time: result.time,
          jockeyName: result.jockeyName,
          penalties: result.penalties,
          notes: result.notes,
          judgeId: user.id,
          createdAt: new Date().toISOString()
        });
      }
    });

    toast({
      title: "تم حفظ النتائج بنجاح",
      description: `تم تسجيل نتائج سباق ${race.name}`
    });

    setIsDialogOpen(false);
    setSelectedRace('');
    setRaceResults([]);
  };

  const getPositionMedal = (position: number) => {
    switch (position) {
      case 1:
        return <Medal className="h-5 w-5 text-yellow-500" data-id="mc9enjw7b" data-path="src/components/Results/ResultsManagement.tsx" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" data-id="yrs1cxw1t" data-path="src/components/Results/ResultsManagement.tsx" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" data-id="9qt8tscdp" data-path="src/components/Results/ResultsManagement.tsx" />;
      default:
        return <span className="h-5 w-5 flex items-center justify-center text-sm font-bold text-gray-600" data-id="dwilkyztt" data-path="src/components/Results/ResultsManagement.tsx">{position}</span>;
    }
  };

  const getResultsByRace = (raceId: string) => {
    return results.filter((result) => result.raceId === raceId).
    sort((a, b) => a.position - b.position);
  };

  const formatTime = (timeString: string) => {
    // Assuming time format is like "1:38.45" (minutes:seconds.milliseconds)
    return timeString;
  };

  return (
    <div className="p-6 space-y-6" dir="rtl" data-id="c6kkcz84w" data-path="src/components/Results/ResultsManagement.tsx">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between" data-id="bzstg8hpq" data-path="src/components/Results/ResultsManagement.tsx">
        <div data-id="qo9l73mnq" data-path="src/components/Results/ResultsManagement.tsx">
          <h1 className="text-3xl font-bold text-gray-900" data-id="ji4mzy2eg" data-path="src/components/Results/ResultsManagement.tsx">إدارة النتائج</h1>
          <p className="text-gray-600 mt-2" data-id="pf2fa6p9n" data-path="src/components/Results/ResultsManagement.tsx">تسجيل ومراجعة نتائج السباقات</p>
        </div>
        {hasRole(['judge', 'admin']) &&
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} data-id="3gefvcvq5" data-path="src/components/Results/ResultsManagement.tsx">
            <DialogTrigger asChild data-id="66qfhds3o" data-path="src/components/Results/ResultsManagement.tsx">
              <Button className="mt-4 md:mt-0" data-id="ti3cva5rr" data-path="src/components/Results/ResultsManagement.tsx">
                <Plus className="h-4 w-4 ml-2" data-id="3muy24tw0" data-path="src/components/Results/ResultsManagement.tsx" />
                إضافة نتائج سباق
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" data-id="av6riiykx" data-path="src/components/Results/ResultsManagement.tsx">
              <DialogHeader data-id="bu8og67hd" data-path="src/components/Results/ResultsManagement.tsx">
                <DialogTitle data-id="9z3ssf51u" data-path="src/components/Results/ResultsManagement.tsx">تسجيل نتائج السباق</DialogTitle>
                <DialogDescription data-id="gg6xay8ha" data-path="src/components/Results/ResultsManagement.tsx">
                  اختر السباق وأدخل النتائج والترتيب النهائي
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6" data-id="vxxzo3od4" data-path="src/components/Results/ResultsManagement.tsx">
                <div className="space-y-2" data-id="7mm1c1xzk" data-path="src/components/Results/ResultsManagement.tsx">
                  <Label data-id="i1423cjgy" data-path="src/components/Results/ResultsManagement.tsx">اختر السباق</Label>
                  <Select value={selectedRace} onValueChange={handleRaceSelect} data-id="cj3qz87hh" data-path="src/components/Results/ResultsManagement.tsx">
                    <SelectTrigger data-id="i6kdv7urf" data-path="src/components/Results/ResultsManagement.tsx">
                      <SelectValue placeholder="اختر السباق لتسجيل نتائجه" data-id="arevt534z" data-path="src/components/Results/ResultsManagement.tsx" />
                    </SelectTrigger>
                    <SelectContent data-id="wpnh8iwom" data-path="src/components/Results/ResultsManagement.tsx">
                      {availableRaces.map((race) =>
                    <SelectItem key={race.id} value={race.id} data-id="duyfhs2oj" data-path="src/components/Results/ResultsManagement.tsx">
                          {race.name} - {new Date(race.date).toLocaleDateString('ar-SA')}
                        </SelectItem>
                    )}
                    </SelectContent>
                  </Select>
                </div>

                {selectedRace && raceResults.length > 0 &&
              <div className="space-y-4" data-id="50nq7ghli" data-path="src/components/Results/ResultsManagement.tsx">
                    <h3 className="text-lg font-semibold" data-id="ruuadxye9" data-path="src/components/Results/ResultsManagement.tsx">ترتيب الخيول وأوقاتها</h3>
                    <div className="space-y-3" data-id="mepdvo9bt" data-path="src/components/Results/ResultsManagement.tsx">
                      {raceResults.map((result, index) => {
                    const horse = horses.find((h) => h.id === result.horseId);
                    return (
                      <Card key={horse?.id} className="p-4" data-id="6oyn442bh" data-path="src/components/Results/ResultsManagement.tsx">
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center" data-id="krikr0yyf" data-path="src/components/Results/ResultsManagement.tsx">
                              <div className="flex items-center gap-2" data-id="hczwf6dff" data-path="src/components/Results/ResultsManagement.tsx">
                                <Select
                              value={result.position.toString()}
                              onValueChange={(value) => updateResult(index, 'position', parseInt(value))} data-id="bstk4aluq" data-path="src/components/Results/ResultsManagement.tsx">

                                  <SelectTrigger className="w-20" data-id="41hehxct2" data-path="src/components/Results/ResultsManagement.tsx">
                                    <SelectValue data-id="pptziesie" data-path="src/components/Results/ResultsManagement.tsx" />
                                  </SelectTrigger>
                                  <SelectContent data-id="1qkfsbmav" data-path="src/components/Results/ResultsManagement.tsx">
                                    {raceResults.map((_, i) =>
                                <SelectItem key={i + 1} value={(i + 1).toString()} data-id="l9yy2rwod" data-path="src/components/Results/ResultsManagement.tsx">
                                        {i + 1}
                                      </SelectItem>
                                )}
                                  </SelectContent>
                                </Select>
                                <span className="font-medium" data-id="bhd4l2eyl" data-path="src/components/Results/ResultsManagement.tsx">{horse?.name}</span>
                              </div>
                              
                              <Input
                            placeholder="الوقت (1:38.45)"
                            value={result.time}
                            onChange={(e) => updateResult(index, 'time', e.target.value)} data-id="k1ov67eej" data-path="src/components/Results/ResultsManagement.tsx" />

                              
                              <Input
                            placeholder="اسم الفارس"
                            value={result.jockeyName}
                            onChange={(e) => updateResult(index, 'jockeyName', e.target.value)} data-id="epmfwq5an" data-path="src/components/Results/ResultsManagement.tsx" />

                              
                              <Input
                            placeholder="العقوبات (اختياري)"
                            value={result.penalties || ''}
                            onChange={(e) => updateResult(index, 'penalties', e.target.value)} data-id="z30r0nbll" data-path="src/components/Results/ResultsManagement.tsx" />

                              
                              <Input
                            placeholder="ملاحظات (اختياري)"
                            value={result.notes || ''}
                            onChange={(e) => updateResult(index, 'notes', e.target.value)} data-id="83cy7xm7s" data-path="src/components/Results/ResultsManagement.tsx" />

                            </div>
                          </Card>);

                  })}
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-4 border-t" data-id="fpltarrp5" data-path="src/components/Results/ResultsManagement.tsx">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-id="h49p1zza8" data-path="src/components/Results/ResultsManagement.tsx">
                        إلغاء
                      </Button>
                      <Button onClick={handleSubmitResults} data-id="e4q5b4o2i" data-path="src/components/Results/ResultsManagement.tsx">
                        حفظ النتائج
                      </Button>
                    </div>
                  </div>
              }
              </div>
            </DialogContent>
          </Dialog>
        }
      </div>

      <div className="space-y-6" data-id="d5k9vcs1p" data-path="src/components/Results/ResultsManagement.tsx">
        {completedRaces.map((race) => {
          const raceResults = getResultsByRace(race.id);

          return (
            <Card key={race.id} data-id="x3e8v0iug" data-path="src/components/Results/ResultsManagement.tsx">
              <CardHeader data-id="bh65xaj8x" data-path="src/components/Results/ResultsManagement.tsx">
                <div className="flex items-start justify-between" data-id="0uxcr4r2n" data-path="src/components/Results/ResultsManagement.tsx">
                  <div data-id="k8jqibb9x" data-path="src/components/Results/ResultsManagement.tsx">
                    <CardTitle className="text-xl flex items-center gap-2" data-id="tdbyeh0a0" data-path="src/components/Results/ResultsManagement.tsx">
                      <Trophy className="h-6 w-6 text-yellow-600" data-id="s0sf3fgdw" data-path="src/components/Results/ResultsManagement.tsx" />
                      {race.name}
                    </CardTitle>
                    <CardDescription className="mt-2" data-id="zgf1rdsq2" data-path="src/components/Results/ResultsManagement.tsx">
                      <div className="flex items-center gap-4 text-sm" data-id="ms79fjuyn" data-path="src/components/Results/ResultsManagement.tsx">
                        <span data-id="uyxtfuiel" data-path="src/components/Results/ResultsManagement.tsx">{new Date(race.date).toLocaleDateString('ar-SA')}</span>
                        <span data-id="4panqm80s" data-path="src/components/Results/ResultsManagement.tsx">{race.location}</span>
                        <span data-id="gkuiqi0xv" data-path="src/components/Results/ResultsManagement.tsx">{race.distance}م</span>
                        <Badge variant="secondary" data-id="0ra14yvhk" data-path="src/components/Results/ResultsManagement.tsx">مكتمل</Badge>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="text-left" data-id="xwlvaq1ug" data-path="src/components/Results/ResultsManagement.tsx">
                    <div className="text-2xl font-bold text-green-600" data-id="3vq5tvkss" data-path="src/components/Results/ResultsManagement.tsx">
                      {race.prize.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600" data-id="z6vvge7w6" data-path="src/components/Results/ResultsManagement.tsx">ريال سعودي</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent data-id="5of9yxt2w" data-path="src/components/Results/ResultsManagement.tsx">
                {raceResults.length > 0 ?
                <div className="space-y-3" data-id="1dibxuzvo" data-path="src/components/Results/ResultsManagement.tsx">
                    <h4 className="font-semibold flex items-center gap-2" data-id="0ro2o84ce" data-path="src/components/Results/ResultsManagement.tsx">
                      <Award className="h-4 w-4" data-id="izvuk9cw4" data-path="src/components/Results/ResultsManagement.tsx" />
                      النتائج النهائية:
                    </h4>
                    <div className="space-y-2" data-id="j6v2gmp9c" data-path="src/components/Results/ResultsManagement.tsx">
                      {raceResults.map((result) =>
                    <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg" data-id="vvk7lx4wt" data-path="src/components/Results/ResultsManagement.tsx">
                          <div className="flex items-center gap-3" data-id="q3jwc3flx" data-path="src/components/Results/ResultsManagement.tsx">
                            {getPositionMedal(result.position)}
                            <div data-id="3yzq2kl9j" data-path="src/components/Results/ResultsManagement.tsx">
                              <div className="font-medium" data-id="5dxue2i7l" data-path="src/components/Results/ResultsManagement.tsx">{result.horseName}</div>
                              <div className="text-sm text-gray-600 flex items-center gap-2" data-id="zhw2a7ubs" data-path="src/components/Results/ResultsManagement.tsx">
                                <User className="h-3 w-3" data-id="qskr86z1z" data-path="src/components/Results/ResultsManagement.tsx" />
                                الفارس: {result.jockeyName}
                              </div>
                            </div>
                          </div>
                          <div className="text-left" data-id="qxsk67j7u" data-path="src/components/Results/ResultsManagement.tsx">
                            <div className="flex items-center gap-2 text-lg font-bold" data-id="315nz3047" data-path="src/components/Results/ResultsManagement.tsx">
                              <Clock className="h-4 w-4" data-id="0fit0rzrx" data-path="src/components/Results/ResultsManagement.tsx" />
                              {formatTime(result.time)}
                            </div>
                            {result.penalties &&
                        <div className="text-sm text-red-600" data-id="ff2r9mo44" data-path="src/components/Results/ResultsManagement.tsx">
                                عقوبة: {result.penalties}
                              </div>
                        }
                          </div>
                        </div>
                    )}
                    </div>
                    
                    <div className="text-sm text-gray-600 pt-2 border-t" data-id="wz9vdiwif" data-path="src/components/Results/ResultsManagement.tsx">
                      الحكم: {raceResults[0]?.judgeId ? user?.name : 'غير محدد'} | 
                      تاريخ التسجيل: {new Date(raceResults[0]?.createdAt || '').toLocaleDateString('ar-SA')}
                    </div>
                  </div> :

                <div className="text-center py-8" data-id="u8whxxr90" data-path="src/components/Results/ResultsManagement.tsx">
                    <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" data-id="xldixzgur" data-path="src/components/Results/ResultsManagement.tsx" />
                    <p className="text-gray-500" data-id="9qjyb94od" data-path="src/components/Results/ResultsManagement.tsx">لم يتم تسجيل النتائج بعد</p>
                    {hasRole(['judge', 'admin']) &&
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSelectedRace(race.id);
                      handleRaceSelect(race.id);
                      setIsDialogOpen(true);
                    }} data-id="nc67wyfu8" data-path="src/components/Results/ResultsManagement.tsx">

                        <Plus className="h-4 w-4 ml-2" data-id="7csn0wnmh" data-path="src/components/Results/ResultsManagement.tsx" />
                        إضافة النتائج
                      </Button>
                  }
                  </div>
                }
              </CardContent>
            </Card>);

        })}

        {completedRaces.length === 0 &&
        <Card data-id="7bq00pjtf" data-path="src/components/Results/ResultsManagement.tsx">
            <CardContent className="text-center py-12" data-id="kx5htjmny" data-path="src/components/Results/ResultsManagement.tsx">
              <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" data-id="0jtlpa890" data-path="src/components/Results/ResultsManagement.tsx" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2" data-id="v13cy224o" data-path="src/components/Results/ResultsManagement.tsx">لا توجد سباقات مكتملة</h3>
              <p className="text-gray-600" data-id="21fbhppvg" data-path="src/components/Results/ResultsManagement.tsx">لم يتم إنجاز أي سباقات لعرض نتائجها</p>
            </CardContent>
          </Card>
        }
      </div>
    </div>);

};

export default ResultsManagement;