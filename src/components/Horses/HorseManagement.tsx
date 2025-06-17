import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useData } from '@/hooks/useData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trophy, Calendar, Weight, Palette } from 'lucide-react';
import { Horse } from '@/types';

const HorseManagement: React.FC = () => {
  const { horses, addHorse, updateHorse } = useData();
  const { user } = useAuth();
  const [selectedHorse, setSelectedHorse] = useState<Horse | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    color: '',
    weight: '',
    trainerName: ''
  });

  const userHorses = user?.role === 'admin' ? horses : horses.filter((horse) => horse.ownerId === user?.id);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const horseData = {
      name: formData.name,
      breed: formData.breed,
      age: parseInt(formData.age),
      ownerId: user.id,
      ownerName: user.name,
      trainerName: formData.trainerName,
      color: formData.color,
      weight: parseInt(formData.weight),
      wins: selectedHorse?.wins || 0,
      races: selectedHorse?.races || 0
    };

    if (selectedHorse) {
      updateHorse(selectedHorse.id, horseData);
      toast({
        title: "تم تحديث بيانات الحصان بنجاح",
        description: "تم حفظ التعديلات على بيانات الحصان"
      });
    } else {
      addHorse(horseData);
      toast({
        title: "تم إضافة الحصان بنجاح",
        description: "تم تسجيل الحصان الجديد في النظام"
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      breed: '',
      age: '',
      color: '',
      weight: '',
      trainerName: ''
    });
    setSelectedHorse(null);
  };

  const handleEdit = (horse: Horse) => {
    setSelectedHorse(horse);
    setFormData({
      name: horse.name,
      breed: horse.breed,
      age: horse.age.toString(),
      color: horse.color,
      weight: horse.weight.toString(),
      trainerName: horse.trainerName || ''
    });
    setIsDialogOpen(true);
  };

  const getWinRate = (wins: number, races: number) => {
    if (races === 0) return 0;
    return (wins / races * 100).toFixed(1);
  };

  return (
    <div className="p-6 space-y-6" dir="rtl" data-id="wmk3t5u67" data-path="src/components/Horses/HorseManagement.tsx">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between" data-id="pej39ct6u" data-path="src/components/Horses/HorseManagement.tsx">
        <div data-id="wy11zuau6" data-path="src/components/Horses/HorseManagement.tsx">
          <h1 className="text-3xl font-bold text-gray-900" data-id="bpujmzmwn" data-path="src/components/Horses/HorseManagement.tsx">إدارة الخيول</h1>
          <p className="text-gray-600 mt-2" data-id="mi90zi1rp" data-path="src/components/Horses/HorseManagement.tsx">إضافة وإدارة الخيول المسجلة</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} data-id="qvl6m06ou" data-path="src/components/Horses/HorseManagement.tsx">
          <DialogTrigger asChild data-id="6dqx9nqlk" data-path="src/components/Horses/HorseManagement.tsx">
            <Button onClick={resetForm} className="mt-4 md:mt-0" data-id="b5hk8ll0i" data-path="src/components/Horses/HorseManagement.tsx">
              <Plus className="h-4 w-4 ml-2" data-id="jn122faiy" data-path="src/components/Horses/HorseManagement.tsx" />
              إضافة حصان جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl" data-id="njjrd3t9x" data-path="src/components/Horses/HorseManagement.tsx">
            <DialogHeader data-id="okbucmgo6" data-path="src/components/Horses/HorseManagement.tsx">
              <DialogTitle data-id="0nhexqsa8" data-path="src/components/Horses/HorseManagement.tsx">
                {selectedHorse ? 'تعديل بيانات الحصان' : 'إضافة حصان جديد'}
              </DialogTitle>
              <DialogDescription data-id="bpqk9e66k" data-path="src/components/Horses/HorseManagement.tsx">
                {selectedHorse ? 'تحديث معلومات الحصان' : 'تسجيل حصان جديد في النظام'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4" data-id="8zzm9khy1" data-path="src/components/Horses/HorseManagement.tsx">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="low1fwgi2" data-path="src/components/Horses/HorseManagement.tsx">
                <div className="space-y-2" data-id="hho8dpxql" data-path="src/components/Horses/HorseManagement.tsx">
                  <Label htmlFor="name" data-id="060xsewvp" data-path="src/components/Horses/HorseManagement.tsx">اسم الحصان</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="أدخل اسم الحصان"
                    required data-id="dcf7h3lz1" data-path="src/components/Horses/HorseManagement.tsx" />

                </div>
                <div className="space-y-2" data-id="on0ld5j5a" data-path="src/components/Horses/HorseManagement.tsx">
                  <Label htmlFor="breed" data-id="mtx1op6h6" data-path="src/components/Horses/HorseManagement.tsx">السلالة</Label>
                  <Select
                    value={formData.breed}
                    onValueChange={(value) => handleInputChange('breed', value)} data-id="ewskbrtj8" data-path="src/components/Horses/HorseManagement.tsx">

                    <SelectTrigger data-id="jrqi7vn08" data-path="src/components/Horses/HorseManagement.tsx">
                      <SelectValue placeholder="اختر السلالة" data-id="sjclqp1kw" data-path="src/components/Horses/HorseManagement.tsx" />
                    </SelectTrigger>
                    <SelectContent data-id="luf6woz6f" data-path="src/components/Horses/HorseManagement.tsx">
                      <SelectItem value="عربي أصيل" data-id="37e0bn4mf" data-path="src/components/Horses/HorseManagement.tsx">عربي أصيل</SelectItem>
                      <SelectItem value="عربي مختلط" data-id="p58anf25t" data-path="src/components/Horses/HorseManagement.tsx">عربي مختلط</SelectItem>
                      <SelectItem value="إنجليزي أصيل" data-id="nxaulla2w" data-path="src/components/Horses/HorseManagement.tsx">إنجليزي أصيل</SelectItem>
                      <SelectItem value="أنجلو عربي" data-id="6z8bv450y" data-path="src/components/Horses/HorseManagement.tsx">أنجلو عربي</SelectItem>
                      <SelectItem value="هجين" data-id="lwexncjiu" data-path="src/components/Horses/HorseManagement.tsx">هجين</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="dkkn4be1p" data-path="src/components/Horses/HorseManagement.tsx">
                <div className="space-y-2" data-id="2ozj5ecw0" data-path="src/components/Horses/HorseManagement.tsx">
                  <Label htmlFor="age" data-id="fj1k6xw3c" data-path="src/components/Horses/HorseManagement.tsx">العمر (سنوات)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="5"
                    min="2"
                    max="20"
                    required data-id="ukccqbgai" data-path="src/components/Horses/HorseManagement.tsx" />

                </div>
                <div className="space-y-2" data-id="gk7suxivm" data-path="src/components/Horses/HorseManagement.tsx">
                  <Label htmlFor="weight" data-id="ho0b8h309" data-path="src/components/Horses/HorseManagement.tsx">الوزن (كجم)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="450"
                    min="300"
                    max="600"
                    required data-id="kzin31ur5" data-path="src/components/Horses/HorseManagement.tsx" />

                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="rtax9or0k" data-path="src/components/Horses/HorseManagement.tsx">
                <div className="space-y-2" data-id="fzf2j57ol" data-path="src/components/Horses/HorseManagement.tsx">
                  <Label htmlFor="color" data-id="nf9ku9n93" data-path="src/components/Horses/HorseManagement.tsx">اللون</Label>
                  <Select
                    value={formData.color}
                    onValueChange={(value) => handleInputChange('color', value)} data-id="r6icj6nck" data-path="src/components/Horses/HorseManagement.tsx">

                    <SelectTrigger data-id="03wds3nsy" data-path="src/components/Horses/HorseManagement.tsx">
                      <SelectValue placeholder="اختر اللون" data-id="7sorvs62u" data-path="src/components/Horses/HorseManagement.tsx" />
                    </SelectTrigger>
                    <SelectContent data-id="cbkzh0vbc" data-path="src/components/Horses/HorseManagement.tsx">
                      <SelectItem value="كستنائي" data-id="78qnlhjsy" data-path="src/components/Horses/HorseManagement.tsx">كستنائي</SelectItem>
                      <SelectItem value="أشقر" data-id="m4wm96mn9" data-path="src/components/Horses/HorseManagement.tsx">أشقر</SelectItem>
                      <SelectItem value="أدهم" data-id="nrlh20enz" data-path="src/components/Horses/HorseManagement.tsx">أدهم</SelectItem>
                      <SelectItem value="أبيض" data-id="fwvw2wivx" data-path="src/components/Horses/HorseManagement.tsx">أبيض</SelectItem>
                      <SelectItem value="رمادي" data-id="338npmwyx" data-path="src/components/Horses/HorseManagement.tsx">رمادي</SelectItem>
                      <SelectItem value="أشهب" data-id="rlag8v9tb" data-path="src/components/Horses/HorseManagement.tsx">أشهب</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2" data-id="zvlu7qca7" data-path="src/components/Horses/HorseManagement.tsx">
                  <Label htmlFor="trainerName" data-id="7hq3oc1ui" data-path="src/components/Horses/HorseManagement.tsx">اسم المدرب</Label>
                  <Input
                    id="trainerName"
                    value={formData.trainerName}
                    onChange={(e) => handleInputChange('trainerName', e.target.value)}
                    placeholder="أدخل اسم المدرب" data-id="a6boyvzz4" data-path="src/components/Horses/HorseManagement.tsx" />

                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4" data-id="914h3a6bo" data-path="src/components/Horses/HorseManagement.tsx">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} data-id="at6h4my1c" data-path="src/components/Horses/HorseManagement.tsx">
                  إلغاء
                </Button>
                <Button type="submit" data-id="yhl42243a" data-path="src/components/Horses/HorseManagement.tsx">
                  {selectedHorse ? 'تحديث البيانات' : 'إضافة الحصان'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-id="gn0qd8agw" data-path="src/components/Horses/HorseManagement.tsx">
        {userHorses.map((horse) =>
        <Card key={horse.id} className="hover:shadow-lg transition-shadow" data-id="w60ekua6j" data-path="src/components/Horses/HorseManagement.tsx">
            <CardHeader data-id="s9f6v4z8g" data-path="src/components/Horses/HorseManagement.tsx">
              <div className="flex items-start justify-between" data-id="um6poti2k" data-path="src/components/Horses/HorseManagement.tsx">
                <div className="flex items-center gap-3" data-id="pa9avl8o9" data-path="src/components/Horses/HorseManagement.tsx">
                  <Avatar className="h-12 w-12" data-id="faih3tghq" data-path="src/components/Horses/HorseManagement.tsx">
                    <AvatarFallback className="text-lg" data-id="qnelgtv9m" data-path="src/components/Horses/HorseManagement.tsx">🐎</AvatarFallback>
                  </Avatar>
                  <div data-id="zo8f1ah5k" data-path="src/components/Horses/HorseManagement.tsx">
                    <CardTitle className="text-lg" data-id="ols0cq6bg" data-path="src/components/Horses/HorseManagement.tsx">{horse.name}</CardTitle>
                    <CardDescription data-id="9f38o5zsm" data-path="src/components/Horses/HorseManagement.tsx">{horse.breed} - {horse.age} سنوات</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleEdit(horse)} data-id="mesqer6uw" data-path="src/components/Horses/HorseManagement.tsx">
                  <Edit className="h-4 w-4" data-id="6b43yudsc" data-path="src/components/Horses/HorseManagement.tsx" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4" data-id="iz8w5vps2" data-path="src/components/Horses/HorseManagement.tsx">
              <div className="grid grid-cols-2 gap-4 text-sm" data-id="7r1t0nt49" data-path="src/components/Horses/HorseManagement.tsx">
                <div className="flex items-center gap-2" data-id="dmuw2bnxm" data-path="src/components/Horses/HorseManagement.tsx">
                  <Palette className="h-4 w-4 text-gray-500" data-id="1mnm0ej4r" data-path="src/components/Horses/HorseManagement.tsx" />
                  <span data-id="ao2btnokm" data-path="src/components/Horses/HorseManagement.tsx">{horse.color}</span>
                </div>
                <div className="flex items-center gap-2" data-id="wvlofqu1h" data-path="src/components/Horses/HorseManagement.tsx">
                  <Weight className="h-4 w-4 text-gray-500" data-id="esbt2spgd" data-path="src/components/Horses/HorseManagement.tsx" />
                  <span data-id="u92edzc1b" data-path="src/components/Horses/HorseManagement.tsx">{horse.weight} كجم</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center" data-id="husbbvjqp" data-path="src/components/Horses/HorseManagement.tsx">
                <div className="p-2 bg-green-50 rounded-lg" data-id="477kywoox" data-path="src/components/Horses/HorseManagement.tsx">
                  <div className="text-lg font-bold text-green-600" data-id="ixdprudkb" data-path="src/components/Horses/HorseManagement.tsx">{horse.wins}</div>
                  <div className="text-xs text-gray-600" data-id="6lj7y9sn0" data-path="src/components/Horses/HorseManagement.tsx">انتصارات</div>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg" data-id="neihc4fxr" data-path="src/components/Horses/HorseManagement.tsx">
                  <div className="text-lg font-bold text-blue-600" data-id="w9kjdwx0p" data-path="src/components/Horses/HorseManagement.tsx">{horse.races}</div>
                  <div className="text-xs text-gray-600" data-id="i9udxwf3l" data-path="src/components/Horses/HorseManagement.tsx">سباقات</div>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg" data-id="6hptotqxv" data-path="src/components/Horses/HorseManagement.tsx">
                  <div className="text-lg font-bold text-purple-600" data-id="4sv0zki1q" data-path="src/components/Horses/HorseManagement.tsx">
                    {getWinRate(horse.wins, horse.races)}%
                  </div>
                  <div className="text-xs text-gray-600" data-id="wkm9u13d2" data-path="src/components/Horses/HorseManagement.tsx">معدل الفوز</div>
                </div>
              </div>

              <div className="space-y-2" data-id="5ny9wp7kq" data-path="src/components/Horses/HorseManagement.tsx">
                <div className="text-sm" data-id="fzwfcxb5m" data-path="src/components/Horses/HorseManagement.tsx">
                  <span className="text-gray-600" data-id="dw1crk4on" data-path="src/components/Horses/HorseManagement.tsx">المالك: </span>
                  <span className="font-medium" data-id="jtb5sgdxr" data-path="src/components/Horses/HorseManagement.tsx">{horse.ownerName}</span>
                </div>
                {horse.trainerName &&
              <div className="text-sm" data-id="1pp3ym7zs" data-path="src/components/Horses/HorseManagement.tsx">
                    <span className="text-gray-600" data-id="tqtjbam48" data-path="src/components/Horses/HorseManagement.tsx">المدرب: </span>
                    <span className="font-medium" data-id="fvsexr70e" data-path="src/components/Horses/HorseManagement.tsx">{horse.trainerName}</span>
                  </div>
              }
              </div>

              <div className="flex items-center justify-between pt-2 border-t" data-id="hprumiwfx" data-path="src/components/Horses/HorseManagement.tsx">
                <Badge variant={horse.wins > 5 ? "default" : "secondary"} data-id="r4ocsoi6k" data-path="src/components/Horses/HorseManagement.tsx">
                  {horse.wins > 5 ? 'متميز' : 'نشط'}
                </Badge>
                <div className="flex gap-1" data-id="yvpq61dnp" data-path="src/components/Horses/HorseManagement.tsx">
                  <Button variant="outline" size="sm" data-id="bigqbeyi8" data-path="src/components/Horses/HorseManagement.tsx">
                    <Trophy className="h-4 w-4" data-id="8nmgfb3s2" data-path="src/components/Horses/HorseManagement.tsx" />
                  </Button>
                  <Button variant="outline" size="sm" data-id="oat2a4ehk" data-path="src/components/Horses/HorseManagement.tsx">
                    <Calendar className="h-4 w-4" data-id="p5h9lco2i" data-path="src/components/Horses/HorseManagement.tsx" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {userHorses.length === 0 &&
        <Card className="col-span-full" data-id="fsrc9adv7" data-path="src/components/Horses/HorseManagement.tsx">
            <CardContent className="text-center py-12" data-id="8m4apkbfn" data-path="src/components/Horses/HorseManagement.tsx">
              <div className="text-6xl mb-4" data-id="w9hcavxlb" data-path="src/components/Horses/HorseManagement.tsx">🐎</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2" data-id="tqw05oqor" data-path="src/components/Horses/HorseManagement.tsx">لا توجد خيول مسجلة</h3>
              <p className="text-gray-600 mb-4" data-id="zzvekjevj" data-path="src/components/Horses/HorseManagement.tsx">ابدأ بإضافة حصانك الأول</p>
              <Button onClick={() => setIsDialogOpen(true)} data-id="lc9b4r3tz" data-path="src/components/Horses/HorseManagement.tsx">
                <Plus className="h-4 w-4 ml-2" data-id="qw39uqrox" data-path="src/components/Horses/HorseManagement.tsx" />
                إضافة حصان جديد
              </Button>
            </CardContent>
          </Card>
        }
      </div>
    </div>);

};

export default HorseManagement;