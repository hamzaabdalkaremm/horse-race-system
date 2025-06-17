import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/hooks/useData';
import { Calendar, Trophy, Users, Clock, Award, TrendingUp } from 'lucide-react';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { races, horses, results } = useData();

  const upcomingRaces = races.filter((race) => race.status === 'upcoming');
  const completedRaces = races.filter((race) => race.status === 'completed');
  const userHorses = horses.filter((horse) => horse.ownerId === user?.id);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 17) return 'ظهرك سعيد';
    return 'مساء الخير';
  };

  const getRoleSpecificContent = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-id="cp3p1un16" data-path="src/components/Dashboard/DashboardHome.tsx">
            <Card data-id="f1n94lu4n" data-path="src/components/Dashboard/DashboardHome.tsx">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="r2bfrxo97" data-path="src/components/Dashboard/DashboardHome.tsx">
                <CardTitle className="text-sm font-medium" data-id="d1uwzxuw7" data-path="src/components/Dashboard/DashboardHome.tsx">إجمالي السباقات</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" data-id="2vwnzo4bb" data-path="src/components/Dashboard/DashboardHome.tsx" />
              </CardHeader>
              <CardContent data-id="g9jcccw3n" data-path="src/components/Dashboard/DashboardHome.tsx">
                <div className="text-2xl font-bold" data-id="70z8njyex" data-path="src/components/Dashboard/DashboardHome.tsx">{races.length}</div>
                <p className="text-xs text-muted-foreground" data-id="v62vp8qlr" data-path="src/components/Dashboard/DashboardHome.tsx">منذ بداية الموسم</p>
              </CardContent>
            </Card>
            <Card data-id="mv6e4g54j" data-path="src/components/Dashboard/DashboardHome.tsx">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="hln04884p" data-path="src/components/Dashboard/DashboardHome.tsx">
                <CardTitle className="text-sm font-medium" data-id="d6wuhq5yj" data-path="src/components/Dashboard/DashboardHome.tsx">إجمالي الخيول</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" data-id="08ryusqbf" data-path="src/components/Dashboard/DashboardHome.tsx" />
              </CardHeader>
              <CardContent data-id="cz6g37hpw" data-path="src/components/Dashboard/DashboardHome.tsx">
                <div className="text-2xl font-bold" data-id="floz3094t" data-path="src/components/Dashboard/DashboardHome.tsx">{horses.length}</div>
                <p className="text-xs text-muted-foreground" data-id="9qo5ogqd8" data-path="src/components/Dashboard/DashboardHome.tsx">مسجلة في النظام</p>
              </CardContent>
            </Card>
            <Card data-id="9hovxwiqz" data-path="src/components/Dashboard/DashboardHome.tsx">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="18wi8wv2h" data-path="src/components/Dashboard/DashboardHome.tsx">
                <CardTitle className="text-sm font-medium" data-id="7sezl8nqp" data-path="src/components/Dashboard/DashboardHome.tsx">السباقات القادمة</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" data-id="c8uz3lkgv" data-path="src/components/Dashboard/DashboardHome.tsx" />
              </CardHeader>
              <CardContent data-id="z0h5zs6sl" data-path="src/components/Dashboard/DashboardHome.tsx">
                <div className="text-2xl font-bold" data-id="a2a3jca01" data-path="src/components/Dashboard/DashboardHome.tsx">{upcomingRaces.length}</div>
                <p className="text-xs text-muted-foreground" data-id="0l18hqpd7" data-path="src/components/Dashboard/DashboardHome.tsx">في الشهر القادم</p>
              </CardContent>
            </Card>
            <Card data-id="wgwfy0zfr" data-path="src/components/Dashboard/DashboardHome.tsx">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="rsxqbu60e" data-path="src/components/Dashboard/DashboardHome.tsx">
                <CardTitle className="text-sm font-medium" data-id="ywygau0us" data-path="src/components/Dashboard/DashboardHome.tsx">النتائج المسجلة</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" data-id="ape28421t" data-path="src/components/Dashboard/DashboardHome.tsx" />
              </CardHeader>
              <CardContent data-id="g1pj0bh4a" data-path="src/components/Dashboard/DashboardHome.tsx">
                <div className="text-2xl font-bold" data-id="nj82xjsap" data-path="src/components/Dashboard/DashboardHome.tsx">{results.length}</div>
                <p className="text-xs text-muted-foreground" data-id="a9m2e90iz" data-path="src/components/Dashboard/DashboardHome.tsx">نتيجة مكتملة</p>
              </CardContent>
            </Card>
          </div>);


      case 'horse_owner':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-id="0nbmvis4x" data-path="src/components/Dashboard/DashboardHome.tsx">
            <Card data-id="t7kztwkru" data-path="src/components/Dashboard/DashboardHome.tsx">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="bd0y0960m" data-path="src/components/Dashboard/DashboardHome.tsx">
                <CardTitle className="text-sm font-medium" data-id="qxi5s07cb" data-path="src/components/Dashboard/DashboardHome.tsx">خيولي</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" data-id="4kh9sbhm4" data-path="src/components/Dashboard/DashboardHome.tsx" />
              </CardHeader>
              <CardContent data-id="oty9jv4fc" data-path="src/components/Dashboard/DashboardHome.tsx">
                <div className="text-2xl font-bold" data-id="iutcglxu1" data-path="src/components/Dashboard/DashboardHome.tsx">{userHorses.length}</div>
                <p className="text-xs text-muted-foreground" data-id="3fz293umi" data-path="src/components/Dashboard/DashboardHome.tsx">حصان مسجل</p>
              </CardContent>
            </Card>
            <Card data-id="kz7himz6w" data-path="src/components/Dashboard/DashboardHome.tsx">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="n6zwz04b3" data-path="src/components/Dashboard/DashboardHome.tsx">
                <CardTitle className="text-sm font-medium" data-id="mgc03luwx" data-path="src/components/Dashboard/DashboardHome.tsx">السباقات المتاحة</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" data-id="z7covjaip" data-path="src/components/Dashboard/DashboardHome.tsx" />
              </CardHeader>
              <CardContent data-id="hxdysw7y2" data-path="src/components/Dashboard/DashboardHome.tsx">
                <div className="text-2xl font-bold" data-id="z30kolpbo" data-path="src/components/Dashboard/DashboardHome.tsx">{upcomingRaces.length}</div>
                <p className="text-xs text-muted-foreground" data-id="id5i89mvh" data-path="src/components/Dashboard/DashboardHome.tsx">سباق متاح</p>
              </CardContent>
            </Card>
            <Card data-id="doksfo7e2" data-path="src/components/Dashboard/DashboardHome.tsx">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="ep6w8r689" data-path="src/components/Dashboard/DashboardHome.tsx">
                <CardTitle className="text-sm font-medium" data-id="rghinnp8w" data-path="src/components/Dashboard/DashboardHome.tsx">إجمالي الانتصارات</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" data-id="mrmpvw8kd" data-path="src/components/Dashboard/DashboardHome.tsx" />
              </CardHeader>
              <CardContent data-id="pkgmmt768" data-path="src/components/Dashboard/DashboardHome.tsx">
                <div className="text-2xl font-bold" data-id="gmci3irza" data-path="src/components/Dashboard/DashboardHome.tsx">
                  {userHorses.reduce((acc, horse) => acc + horse.wins, 0)}
                </div>
                <p className="text-xs text-muted-foreground" data-id="ruluqrzxs" data-path="src/components/Dashboard/DashboardHome.tsx">فوز محقق</p>
              </CardContent>
            </Card>
          </div>);


      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" data-id="inum3ql0e" data-path="src/components/Dashboard/DashboardHome.tsx">
            <Card data-id="fd96jnq69" data-path="src/components/Dashboard/DashboardHome.tsx">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="3z22i440n" data-path="src/components/Dashboard/DashboardHome.tsx">
                <CardTitle className="text-sm font-medium" data-id="tvn9mr40s" data-path="src/components/Dashboard/DashboardHome.tsx">السباقات القادمة</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" data-id="vfv13cuat" data-path="src/components/Dashboard/DashboardHome.tsx" />
              </CardHeader>
              <CardContent data-id="xxt4qytfq" data-path="src/components/Dashboard/DashboardHome.tsx">
                <div className="text-2xl font-bold" data-id="uzzd93prc" data-path="src/components/Dashboard/DashboardHome.tsx">{upcomingRaces.length}</div>
                <p className="text-xs text-muted-foreground" data-id="8aoyfbovs" data-path="src/components/Dashboard/DashboardHome.tsx">سباق في الأسابيع القادمة</p>
              </CardContent>
            </Card>
            <Card data-id="gur884wdr" data-path="src/components/Dashboard/DashboardHome.tsx">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="zq4s4729n" data-path="src/components/Dashboard/DashboardHome.tsx">
                <CardTitle className="text-sm font-medium" data-id="wsn3nijku" data-path="src/components/Dashboard/DashboardHome.tsx">النتائج الأخيرة</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" data-id="dzg2e4sla" data-path="src/components/Dashboard/DashboardHome.tsx" />
              </CardHeader>
              <CardContent data-id="oofsvvner" data-path="src/components/Dashboard/DashboardHome.tsx">
                <div className="text-2xl font-bold" data-id="bqemrngxc" data-path="src/components/Dashboard/DashboardHome.tsx">{completedRaces.length}</div>
                <p className="text-xs text-muted-foreground" data-id="i5n7cjowh" data-path="src/components/Dashboard/DashboardHome.tsx">سباق مكتمل</p>
              </CardContent>
            </Card>
          </div>);

    }
  };

  return (
    <div className="p-6 space-y-8" dir="rtl" data-id="0cqxlieu4" data-path="src/components/Dashboard/DashboardHome.tsx">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between" data-id="39belnk2q" data-path="src/components/Dashboard/DashboardHome.tsx">
        <div data-id="236mx50sp" data-path="src/components/Dashboard/DashboardHome.tsx">
          <h1 className="text-3xl font-bold text-gray-900" data-id="hxhnt8bj6" data-path="src/components/Dashboard/DashboardHome.tsx">
            {getGreeting()}، {user?.name}
          </h1>
          <p className="text-gray-600 mt-2" data-id="exxhj1lku" data-path="src/components/Dashboard/DashboardHome.tsx">مرحباً بك في لوحة التحكم الخاصة بك</p>
        </div>
        <div className="mt-4 md:mt-0" data-id="ikkz77jpu" data-path="src/components/Dashboard/DashboardHome.tsx">
          <Badge variant="outline" className="text-sm" data-id="rora0t2r3" data-path="src/components/Dashboard/DashboardHome.tsx">
            {new Date().toLocaleDateString('ar-SA', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Badge>
        </div>
      </div>

      {getRoleSpecificContent()}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-id="wi8b8pw00" data-path="src/components/Dashboard/DashboardHome.tsx">
        <Card data-id="7xrw1mme6" data-path="src/components/Dashboard/DashboardHome.tsx">
          <CardHeader data-id="k45ql4w3u" data-path="src/components/Dashboard/DashboardHome.tsx">
            <CardTitle data-id="pr86jyxqe" data-path="src/components/Dashboard/DashboardHome.tsx">السباقات القادمة</CardTitle>
            <CardDescription data-id="giw7u2tds" data-path="src/components/Dashboard/DashboardHome.tsx">أهم السباقات في الأيام المقبلة</CardDescription>
          </CardHeader>
          <CardContent data-id="s1114p3vv" data-path="src/components/Dashboard/DashboardHome.tsx">
            <div className="space-y-4" data-id="v8mizdd45" data-path="src/components/Dashboard/DashboardHome.tsx">
              {upcomingRaces.slice(0, 3).map((race) =>
              <div key={race.id} className="flex items-center justify-between p-4 border rounded-lg" data-id="tzdrq1twi" data-path="src/components/Dashboard/DashboardHome.tsx">
                  <div data-id="4547zig34" data-path="src/components/Dashboard/DashboardHome.tsx">
                    <h3 className="font-semibold" data-id="0rjb7lklg" data-path="src/components/Dashboard/DashboardHome.tsx">{race.name}</h3>
                    <p className="text-sm text-gray-600" data-id="9vxvyobv0" data-path="src/components/Dashboard/DashboardHome.tsx">
                      {new Date(race.date).toLocaleDateString('ar-SA')} - {race.time}
                    </p>
                    <p className="text-sm text-gray-500" data-id="rvfcn2ii5" data-path="src/components/Dashboard/DashboardHome.tsx">{race.location}</p>
                  </div>
                  <div className="text-left" data-id="zg5bofrnx" data-path="src/components/Dashboard/DashboardHome.tsx">
                    <Badge variant="secondary" data-id="dj0q5tfum" data-path="src/components/Dashboard/DashboardHome.tsx">{race.registeredHorses.length}/{race.maxHorses}</Badge>
                    <p className="text-sm text-gray-600 mt-1" data-id="n1sp6rn92" data-path="src/components/Dashboard/DashboardHome.tsx">{race.distance}م</p>
                  </div>
                </div>
              )}
              {upcomingRaces.length === 0 &&
              <p className="text-center text-gray-500 py-8" data-id="1v4jojmwy" data-path="src/components/Dashboard/DashboardHome.tsx">لا توجد سباقات قادمة حالياً</p>
              }
            </div>
          </CardContent>
        </Card>

        <Card data-id="tz2k7e9ya" data-path="src/components/Dashboard/DashboardHome.tsx">
          <CardHeader data-id="diz7dfzqf" data-path="src/components/Dashboard/DashboardHome.tsx">
            <CardTitle data-id="nkgcmgswm" data-path="src/components/Dashboard/DashboardHome.tsx">آخر النتائج</CardTitle>
            <CardDescription data-id="tviapskjy" data-path="src/components/Dashboard/DashboardHome.tsx">نتائج السباقات الأخيرة</CardDescription>
          </CardHeader>
          <CardContent data-id="6wapzv4yx" data-path="src/components/Dashboard/DashboardHome.tsx">
            <div className="space-y-4" data-id="8jz1jkfe8" data-path="src/components/Dashboard/DashboardHome.tsx">
              {results.slice(0, 3).map((result) =>
              <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg" data-id="cxrg2yeg8" data-path="src/components/Dashboard/DashboardHome.tsx">
                  <div data-id="3rdcdcicd" data-path="src/components/Dashboard/DashboardHome.tsx">
                    <h3 className="font-semibold" data-id="vc0gkfcic" data-path="src/components/Dashboard/DashboardHome.tsx">{result.raceName}</h3>
                    <p className="text-sm text-gray-600" data-id="kkhvveszz" data-path="src/components/Dashboard/DashboardHome.tsx">الفائز: {result.horseName}</p>
                    <p className="text-sm text-gray-500" data-id="p7yy7frd6" data-path="src/components/Dashboard/DashboardHome.tsx">الوقت: {result.time}</p>
                  </div>
                  <div className="text-left" data-id="mqmgwn2vs" data-path="src/components/Dashboard/DashboardHome.tsx">
                    <Badge variant={result.position === 1 ? "default" : "secondary"} data-id="8b300esa2" data-path="src/components/Dashboard/DashboardHome.tsx">
                      المركز {result.position}
                    </Badge>
                  </div>
                </div>
              )}
              {results.length === 0 &&
              <p className="text-center text-gray-500 py-8" data-id="thkuecvw9" data-path="src/components/Dashboard/DashboardHome.tsx">لا توجد نتائج مسجلة حالياً</p>
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {user?.role === 'horse_owner' && userHorses.length > 0 &&
      <Card data-id="sksn8v1d3" data-path="src/components/Dashboard/DashboardHome.tsx">
          <CardHeader data-id="pjoc1x2wu" data-path="src/components/Dashboard/DashboardHome.tsx">
            <CardTitle data-id="q3znd6gym" data-path="src/components/Dashboard/DashboardHome.tsx">خيولي</CardTitle>
            <CardDescription data-id="2f1rv5byh" data-path="src/components/Dashboard/DashboardHome.tsx">نظرة سريعة على خيولك المسجلة</CardDescription>
          </CardHeader>
          <CardContent data-id="evwtwpq1a" data-path="src/components/Dashboard/DashboardHome.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-id="5f9uwsu3q" data-path="src/components/Dashboard/DashboardHome.tsx">
              {userHorses.map((horse) =>
            <div key={horse.id} className="p-4 border rounded-lg" data-id="jctz4vm0y" data-path="src/components/Dashboard/DashboardHome.tsx">
                  <h3 className="font-semibold" data-id="3gb8njwzo" data-path="src/components/Dashboard/DashboardHome.tsx">{horse.name}</h3>
                  <p className="text-sm text-gray-600" data-id="mmipn8py6" data-path="src/components/Dashboard/DashboardHome.tsx">{horse.breed} - {horse.age} سنوات</p>
                  <div className="flex items-center justify-between mt-2" data-id="3i4doiltn" data-path="src/components/Dashboard/DashboardHome.tsx">
                    <span className="text-sm" data-id="4801wxbf1" data-path="src/components/Dashboard/DashboardHome.tsx">الانتصارات: {horse.wins}</span>
                    <span className="text-sm" data-id="d1vu43hah" data-path="src/components/Dashboard/DashboardHome.tsx">السباقات: {horse.races}</span>
                  </div>
                </div>
            )}
            </div>
          </CardContent>
        </Card>
      }

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50" data-id="9ypnccz36" data-path="src/components/Dashboard/DashboardHome.tsx">
        <CardContent className="p-6" data-id="2nbt5f8hl" data-path="src/components/Dashboard/DashboardHome.tsx">
          <div className="flex items-center justify-between" data-id="8yvvgdli3" data-path="src/components/Dashboard/DashboardHome.tsx">
            <div data-id="kk2cx9rhp" data-path="src/components/Dashboard/DashboardHome.tsx">
              <h3 className="text-lg font-semibold text-gray-900" data-id="7g1lizwlc" data-path="src/components/Dashboard/DashboardHome.tsx">
                مرحباً بك في نظام إدارة سباق الخيل
              </h3>
              <p className="text-gray-600 mt-2" data-id="f8up15b4p" data-path="src/components/Dashboard/DashboardHome.tsx">
                منصة شاملة لإدارة السباقات والخيول مع دعم كامل للغة العربية
              </p>
            </div>
            <div className="hidden md:block" data-id="ewk7y22j9" data-path="src/components/Dashboard/DashboardHome.tsx">
              <div className="text-6xl" data-id="l47042x1i" data-path="src/components/Dashboard/DashboardHome.tsx">🏆</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);

};

export default DashboardHome;