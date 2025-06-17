import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/hooks/useData';
import { Calendar, Clock, MapPin, Trophy, Users, Eye } from 'lucide-react';

const RaceSchedule: React.FC = () => {
  const { races, horses } = useData();
  const [selectedView, setSelectedView] = useState<'upcoming' | 'completed' | 'all'>('upcoming');

  const upcomingRaces = races.filter((race) => race.status === 'upcoming');
  const completedRaces = races.filter((race) => race.status === 'completed');
  const allRaces = races;

  const getRacesToShow = () => {
    switch (selectedView) {
      case 'upcoming':
        return upcomingRaces;
      case 'completed':
        return completedRaces;
      default:
        return allRaces;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      upcoming: { label: 'قادم', variant: 'default' as const },
      active: { label: 'نشط', variant: 'default' as const },
      completed: { label: 'مكتمل', variant: 'secondary' as const },
      cancelled: { label: 'ملغي', variant: 'destructive' as const }
    };
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return <Badge variant={statusInfo.variant} data-id="o38n683i6" data-path="src/components/Schedule/RaceSchedule.tsx">{statusInfo.label}</Badge>;
  };

  const getRegisteredHorses = (horseIds: string[]) => {
    return horses.filter((horse) => horseIds.includes(horse.id));
  };

  const sortRacesByDate = (races: typeof allRaces) => {
    return races.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const formatRaceDate = (date: string, time: string) => {
    const raceDate = new Date(`${date} ${time}`);
    return {
      date: raceDate.toLocaleDateString('ar-SA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: raceDate.toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const getTimeUntilRace = (date: string, time: string) => {
    const raceDate = new Date(`${date} ${time}`);
    const now = new Date();
    const diff = raceDate.getTime() - now.getTime();

    if (diff < 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days} يوم${days > 1 ? ' أيام' : ''}`;
    } else if (hours > 0) {
      return `${hours} ساعة${hours > 1 ? ' ساعات' : ''}`;
    } else {
      return 'أقل من ساعة';
    }
  };

  return (
    <div className="p-6 space-y-6" dir="rtl" data-id="yjsmmky15" data-path="src/components/Schedule/RaceSchedule.tsx">
      <div data-id="jww29iuwq" data-path="src/components/Schedule/RaceSchedule.tsx">
        <h1 className="text-3xl font-bold text-gray-900" data-id="5158990nt" data-path="src/components/Schedule/RaceSchedule.tsx">الجدولة والمواعيد</h1>
        <p className="text-gray-600 mt-2" data-id="z6d4qwjpx" data-path="src/components/Schedule/RaceSchedule.tsx">عرض مواعيد السباقات القادمة والسابقة</p>
      </div>

      <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as any)} data-id="oqvgpho1d" data-path="src/components/Schedule/RaceSchedule.tsx">
        <TabsList className="grid w-full grid-cols-3" data-id="dxu3e2hu2" data-path="src/components/Schedule/RaceSchedule.tsx">
          <TabsTrigger value="upcoming" data-id="s9j75s3fo" data-path="src/components/Schedule/RaceSchedule.tsx">السباقات القادمة ({upcomingRaces.length})</TabsTrigger>
          <TabsTrigger value="completed" data-id="24uov6tch" data-path="src/components/Schedule/RaceSchedule.tsx">السباقات المكتملة ({completedRaces.length})</TabsTrigger>
          <TabsTrigger value="all" data-id="iwzcntmmd" data-path="src/components/Schedule/RaceSchedule.tsx">جميع السباقات ({allRaces.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4" data-id="p6566k7a4" data-path="src/components/Schedule/RaceSchedule.tsx">
          <div className="grid gap-4" data-id="ix5h768h7" data-path="src/components/Schedule/RaceSchedule.tsx">
            {upcomingRaces.length > 0 ?
            sortRacesByDate(upcomingRaces).map((race) => {
              const { date, time } = formatRaceDate(race.date, race.time);
              const timeUntil = getTimeUntilRace(race.date, race.time);
              const registeredHorses = getRegisteredHorses(race.registeredHorses);

              return (
                <Card key={race.id} className="hover:shadow-lg transition-shadow" data-id="e48kd9fni" data-path="src/components/Schedule/RaceSchedule.tsx">
                    <CardHeader data-id="uxnr424tg" data-path="src/components/Schedule/RaceSchedule.tsx">
                      <div className="flex items-start justify-between" data-id="xyohhjkwj" data-path="src/components/Schedule/RaceSchedule.tsx">
                        <div data-id="8q12n4ev2" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <CardTitle className="text-xl flex items-center gap-2" data-id="dffbjt0sl" data-path="src/components/Schedule/RaceSchedule.tsx">
                            <Trophy className="h-5 w-5 text-yellow-600" data-id="2wltebc4t" data-path="src/components/Schedule/RaceSchedule.tsx" />
                            {race.name}
                          </CardTitle>
                          <CardDescription className="space-y-1 mt-2" data-id="7dlq51b4v" data-path="src/components/Schedule/RaceSchedule.tsx">
                            <div className="flex items-center gap-4" data-id="5pyanive1" data-path="src/components/Schedule/RaceSchedule.tsx">
                              <span className="flex items-center gap-1" data-id="opmy5cfju" data-path="src/components/Schedule/RaceSchedule.tsx">
                                <Calendar className="h-4 w-4" data-id="cuby6btwf" data-path="src/components/Schedule/RaceSchedule.tsx" />
                                {date}
                              </span>
                              <span className="flex items-center gap-1" data-id="0yx68gbqc" data-path="src/components/Schedule/RaceSchedule.tsx">
                                <Clock className="h-4 w-4" data-id="osises2vy" data-path="src/components/Schedule/RaceSchedule.tsx" />
                                {time}
                              </span>
                            </div>
                            <div className="flex items-center gap-1" data-id="mnrin734x" data-path="src/components/Schedule/RaceSchedule.tsx">
                              <MapPin className="h-4 w-4" data-id="711q426bt" data-path="src/components/Schedule/RaceSchedule.tsx" />
                              {race.location}
                            </div>
                          </CardDescription>
                        </div>
                        <div className="text-left space-y-2" data-id="noltq14rh" data-path="src/components/Schedule/RaceSchedule.tsx">
                          {getStatusBadge(race.status)}
                          {timeUntil &&
                        <div className="text-sm text-blue-600 font-medium" data-id="csh48qlzo" data-path="src/components/Schedule/RaceSchedule.tsx">
                              متبقي: {timeUntil}
                            </div>
                        }
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent data-id="kignpjiaa" data-path="src/components/Schedule/RaceSchedule.tsx">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4" data-id="8gw7gs6mx" data-path="src/components/Schedule/RaceSchedule.tsx">
                        <div className="text-center p-3 bg-blue-50 rounded-lg" data-id="e56jucph9" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <div className="text-2xl font-bold text-blue-600" data-id="otz4xjbna" data-path="src/components/Schedule/RaceSchedule.tsx">{race.distance}م</div>
                          <div className="text-sm text-gray-600" data-id="4hcvmc3o6" data-path="src/components/Schedule/RaceSchedule.tsx">المسافة</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg" data-id="kvm33n06r" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <div className="text-2xl font-bold text-green-600" data-id="xlih249fp" data-path="src/components/Schedule/RaceSchedule.tsx">
                            {race.registeredHorses.length}/{race.maxHorses}
                          </div>
                          <div className="text-sm text-gray-600" data-id="ogv45hu2b" data-path="src/components/Schedule/RaceSchedule.tsx">الخيول المسجلة</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg" data-id="mfw135k54" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <div className="text-2xl font-bold text-purple-600" data-id="03zvvqu7e" data-path="src/components/Schedule/RaceSchedule.tsx">
                            {race.prize.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600" data-id="2ggotjrhz" data-path="src/components/Schedule/RaceSchedule.tsx">قيمة الجائزة</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg" data-id="wnt4pislo" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <div className="text-sm font-bold text-orange-600" data-id="9ijpwgxlh" data-path="src/components/Schedule/RaceSchedule.tsx">{race.ageCategory}</div>
                          <div className="text-sm text-gray-600" data-id="716jk1at4" data-path="src/components/Schedule/RaceSchedule.tsx">فئة العمر</div>
                        </div>
                      </div>

                      {registeredHorses.length > 0 &&
                    <div className="mb-4" data-id="7zzj0kktx" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <h4 className="font-semibold mb-2 flex items-center gap-2" data-id="ngxplo4rp" data-path="src/components/Schedule/RaceSchedule.tsx">
                            <Users className="h-4 w-4" data-id="tp30dbqeu" data-path="src/components/Schedule/RaceSchedule.tsx" />
                            الخيول المسجلة:
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2" data-id="mvipj3dxz" data-path="src/components/Schedule/RaceSchedule.tsx">
                            {registeredHorses.map((horse) =>
                        <div key={horse.id} className="text-sm p-2 bg-gray-50 rounded" data-id="js3avrpw5" data-path="src/components/Schedule/RaceSchedule.tsx">
                                <div className="font-medium" data-id="n4hbyx21g" data-path="src/components/Schedule/RaceSchedule.tsx">{horse.name}</div>
                                <div className="text-gray-600" data-id="chqma8lwc" data-path="src/components/Schedule/RaceSchedule.tsx">{horse.ownerName}</div>
                              </div>
                        )}
                          </div>
                        </div>
                    }

                      <div className="flex items-center justify-between pt-2 border-t" data-id="1m9r63jnd" data-path="src/components/Schedule/RaceSchedule.tsx">
                        <div className="text-sm text-gray-600" data-id="xakuy3nq1" data-path="src/components/Schedule/RaceSchedule.tsx">
                          منظم بواسطة: {race.organizerName}
                        </div>
                        <Button variant="outline" size="sm" data-id="jldwkfj6v" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <Eye className="h-4 w-4 ml-1" data-id="u1n1eifb0" data-path="src/components/Schedule/RaceSchedule.tsx" />
                          عرض التفاصيل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>);

            }) :

            <Card data-id="k9tt66wfe" data-path="src/components/Schedule/RaceSchedule.tsx">
                <CardContent className="text-center py-12" data-id="73yl1d94q" data-path="src/components/Schedule/RaceSchedule.tsx">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" data-id="q8z6bgz3f" data-path="src/components/Schedule/RaceSchedule.tsx" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" data-id="tl62nolr9" data-path="src/components/Schedule/RaceSchedule.tsx">لا توجد سباقات قادمة</h3>
                  <p className="text-gray-600" data-id="9jae10o65" data-path="src/components/Schedule/RaceSchedule.tsx">لم يتم تحديد أي سباقات قادمة حالياً</p>
                </CardContent>
              </Card>
            }
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4" data-id="0spshoo37" data-path="src/components/Schedule/RaceSchedule.tsx">
          <div className="grid gap-4" data-id="fgvyumbpy" data-path="src/components/Schedule/RaceSchedule.tsx">
            {completedRaces.length > 0 ?
            sortRacesByDate(completedRaces).reverse().map((race) => {
              const { date, time } = formatRaceDate(race.date, race.time);
              const registeredHorses = getRegisteredHorses(race.registeredHorses);

              return (
                <Card key={race.id} className="hover:shadow-lg transition-shadow" data-id="m8po0lno2" data-path="src/components/Schedule/RaceSchedule.tsx">
                    <CardHeader data-id="ajman9mej" data-path="src/components/Schedule/RaceSchedule.tsx">
                      <div className="flex items-start justify-between" data-id="aaaddtpeq" data-path="src/components/Schedule/RaceSchedule.tsx">
                        <div data-id="cvlfpwn3v" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <CardTitle className="text-xl flex items-center gap-2" data-id="438a0t241" data-path="src/components/Schedule/RaceSchedule.tsx">
                            <Trophy className="h-5 w-5 text-gray-600" data-id="xokxlhhad" data-path="src/components/Schedule/RaceSchedule.tsx" />
                            {race.name}
                          </CardTitle>
                          <CardDescription className="space-y-1 mt-2" data-id="6ywyq0wmm" data-path="src/components/Schedule/RaceSchedule.tsx">
                            <div className="flex items-center gap-4" data-id="lq1bs1io7" data-path="src/components/Schedule/RaceSchedule.tsx">
                              <span className="flex items-center gap-1" data-id="aizpcx9o8" data-path="src/components/Schedule/RaceSchedule.tsx">
                                <Calendar className="h-4 w-4" data-id="8yv3xd0dv" data-path="src/components/Schedule/RaceSchedule.tsx" />
                                {date}
                              </span>
                              <span className="flex items-center gap-1" data-id="xnrw07sd8" data-path="src/components/Schedule/RaceSchedule.tsx">
                                <Clock className="h-4 w-4" data-id="r6zn14umi" data-path="src/components/Schedule/RaceSchedule.tsx" />
                                {time}
                              </span>
                            </div>
                            <div className="flex items-center gap-1" data-id="0y8qa9pda" data-path="src/components/Schedule/RaceSchedule.tsx">
                              <MapPin className="h-4 w-4" data-id="12oti4hj2" data-path="src/components/Schedule/RaceSchedule.tsx" />
                              {race.location}
                            </div>
                          </CardDescription>
                        </div>
                        <div className="text-left" data-id="xv0enhbcf" data-path="src/components/Schedule/RaceSchedule.tsx">
                          {getStatusBadge(race.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent data-id="6bxaxo2fj" data-path="src/components/Schedule/RaceSchedule.tsx">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4" data-id="lyevf5e8q" data-path="src/components/Schedule/RaceSchedule.tsx">
                        <div className="text-center p-3 bg-gray-50 rounded-lg" data-id="jq8tu0e3v" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <div className="text-2xl font-bold text-gray-600" data-id="n0uxb2872" data-path="src/components/Schedule/RaceSchedule.tsx">{race.distance}م</div>
                          <div className="text-sm text-gray-600" data-id="gqt80lcni" data-path="src/components/Schedule/RaceSchedule.tsx">المسافة</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg" data-id="xb80s5ich" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <div className="text-2xl font-bold text-gray-600" data-id="fyv02o0lo" data-path="src/components/Schedule/RaceSchedule.tsx">
                            {race.registeredHorses.length}
                          </div>
                          <div className="text-sm text-gray-600" data-id="56ka1srm0" data-path="src/components/Schedule/RaceSchedule.tsx">خيول شاركت</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg" data-id="h6kutyb75" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <div className="text-2xl font-bold text-gray-600" data-id="jcmouoya6" data-path="src/components/Schedule/RaceSchedule.tsx">
                            {race.prize.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600" data-id="snxpusbnx" data-path="src/components/Schedule/RaceSchedule.tsx">قيمة الجائزة</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg" data-id="b89xjvlp9" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <div className="text-sm font-bold text-gray-600" data-id="2kb08rafk" data-path="src/components/Schedule/RaceSchedule.tsx">{race.ageCategory}</div>
                          <div className="text-sm text-gray-600" data-id="ck338aiyd" data-path="src/components/Schedule/RaceSchedule.tsx">فئة العمر</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t" data-id="rykvgg8a7" data-path="src/components/Schedule/RaceSchedule.tsx">
                        <div className="text-sm text-gray-600" data-id="8sapo1946" data-path="src/components/Schedule/RaceSchedule.tsx">
                          منظم بواسطة: {race.organizerName}
                        </div>
                        <Button variant="outline" size="sm" data-id="yha6mnayx" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <Eye className="h-4 w-4 ml-1" data-id="ciey3lpbs" data-path="src/components/Schedule/RaceSchedule.tsx" />
                          عرض النتائج
                        </Button>
                      </div>
                    </CardContent>
                  </Card>);

            }) :

            <Card data-id="pp1n6qap0" data-path="src/components/Schedule/RaceSchedule.tsx">
                <CardContent className="text-center py-12" data-id="mfi41eogd" data-path="src/components/Schedule/RaceSchedule.tsx">
                  <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" data-id="i3nrhdb0y" data-path="src/components/Schedule/RaceSchedule.tsx" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" data-id="75khqcs4c" data-path="src/components/Schedule/RaceSchedule.tsx">لا توجد سباقات مكتملة</h3>
                  <p className="text-gray-600" data-id="s8649dkn8" data-path="src/components/Schedule/RaceSchedule.tsx">لم يتم إنجاز أي سباقات بعد</p>
                </CardContent>
              </Card>
            }
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4" data-id="7pcx6lhp3" data-path="src/components/Schedule/RaceSchedule.tsx">
          <div className="grid gap-4" data-id="tmai2asvr" data-path="src/components/Schedule/RaceSchedule.tsx">
            {allRaces.length > 0 ?
            sortRacesByDate(allRaces).map((race) => {
              const { date, time } = formatRaceDate(race.date, race.time);
              const timeUntil = race.status === 'upcoming' ? getTimeUntilRace(race.date, race.time) : null;

              return (
                <Card key={race.id} className="hover:shadow-lg transition-shadow" data-id="4u18jn862" data-path="src/components/Schedule/RaceSchedule.tsx">
                    <CardHeader data-id="gydr4ajv8" data-path="src/components/Schedule/RaceSchedule.tsx">
                      <div className="flex items-start justify-between" data-id="9qajuw75a" data-path="src/components/Schedule/RaceSchedule.tsx">
                        <div data-id="tt0jfxq77" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <CardTitle className="text-xl flex items-center gap-2" data-id="wxw7fcm5m" data-path="src/components/Schedule/RaceSchedule.tsx">
                            <Trophy className={`h-5 w-5 ${race.status === 'upcoming' ? 'text-yellow-600' : 'text-gray-600'}`} data-id="rllv3qzwh" data-path="src/components/Schedule/RaceSchedule.tsx" />
                            {race.name}
                          </CardTitle>
                          <CardDescription className="space-y-1 mt-2" data-id="vxppqag4j" data-path="src/components/Schedule/RaceSchedule.tsx">
                            <div className="flex items-center gap-4" data-id="v401bzglm" data-path="src/components/Schedule/RaceSchedule.tsx">
                              <span className="flex items-center gap-1" data-id="60yaxxlko" data-path="src/components/Schedule/RaceSchedule.tsx">
                                <Calendar className="h-4 w-4" data-id="1bslv0qxb" data-path="src/components/Schedule/RaceSchedule.tsx" />
                                {date}
                              </span>
                              <span className="flex items-center gap-1" data-id="xtqudmcla" data-path="src/components/Schedule/RaceSchedule.tsx">
                                <Clock className="h-4 w-4" data-id="qq5l9knef" data-path="src/components/Schedule/RaceSchedule.tsx" />
                                {time}
                              </span>
                            </div>
                            <div className="flex items-center gap-1" data-id="yfrq5i4u2" data-path="src/components/Schedule/RaceSchedule.tsx">
                              <MapPin className="h-4 w-4" data-id="v33jc3x9k" data-path="src/components/Schedule/RaceSchedule.tsx" />
                              {race.location}
                            </div>
                          </CardDescription>
                        </div>
                        <div className="text-left space-y-2" data-id="5ke5xk283" data-path="src/components/Schedule/RaceSchedule.tsx">
                          {getStatusBadge(race.status)}
                          {timeUntil &&
                        <div className="text-sm text-blue-600 font-medium" data-id="07frvapgs" data-path="src/components/Schedule/RaceSchedule.tsx">
                              متبقي: {timeUntil}
                            </div>
                        }
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent data-id="axl0720ti" data-path="src/components/Schedule/RaceSchedule.tsx">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4" data-id="5dstrmf8j" data-path="src/components/Schedule/RaceSchedule.tsx">
                        <div className="text-center p-3 bg-blue-50 rounded-lg" data-id="tzqu1kf8m" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <div className="text-2xl font-bold text-blue-600" data-id="jbtazivnj" data-path="src/components/Schedule/RaceSchedule.tsx">{race.distance}م</div>
                          <div className="text-sm text-gray-600" data-id="z73oaep8y" data-path="src/components/Schedule/RaceSchedule.tsx">المسافة</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg" data-id="0o0lzzkl1" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <div className="text-2xl font-bold text-green-600" data-id="a9f5c297j" data-path="src/components/Schedule/RaceSchedule.tsx">
                            {race.registeredHorses.length}/{race.maxHorses}
                          </div>
                          <div className="text-sm text-gray-600" data-id="6jj7ka2dm" data-path="src/components/Schedule/RaceSchedule.tsx">الخيول المسجلة</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg" data-id="x3ez1bnj8" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <div className="text-2xl font-bold text-purple-600" data-id="zmv61n5c6" data-path="src/components/Schedule/RaceSchedule.tsx">
                            {race.prize.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600" data-id="jx8rqj2wy" data-path="src/components/Schedule/RaceSchedule.tsx">قيمة الجائزة</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg" data-id="vnc8bhm6q" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <div className="text-sm font-bold text-orange-600" data-id="1b38ifwy9" data-path="src/components/Schedule/RaceSchedule.tsx">{race.ageCategory}</div>
                          <div className="text-sm text-gray-600" data-id="zxzdo4b8g" data-path="src/components/Schedule/RaceSchedule.tsx">فئة العمر</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t" data-id="dhmjdvrks" data-path="src/components/Schedule/RaceSchedule.tsx">
                        <div className="text-sm text-gray-600" data-id="y3qch40lv" data-path="src/components/Schedule/RaceSchedule.tsx">
                          منظم بواسطة: {race.organizerName}
                        </div>
                        <Button variant="outline" size="sm" data-id="8ie066b27" data-path="src/components/Schedule/RaceSchedule.tsx">
                          <Eye className="h-4 w-4 ml-1" data-id="4zfqh22b3" data-path="src/components/Schedule/RaceSchedule.tsx" />
                          {race.status === 'completed' ? 'عرض النتائج' : 'عرض التفاصيل'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>);

            }) :

            <Card data-id="gsvrge34x" data-path="src/components/Schedule/RaceSchedule.tsx">
                <CardContent className="text-center py-12" data-id="yfxgkd9en" data-path="src/components/Schedule/RaceSchedule.tsx">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" data-id="nu3w5jhiw" data-path="src/components/Schedule/RaceSchedule.tsx" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" data-id="8ybj7zr5s" data-path="src/components/Schedule/RaceSchedule.tsx">لا توجد سباقات</h3>
                  <p className="text-gray-600" data-id="lcwmxmg2d" data-path="src/components/Schedule/RaceSchedule.tsx">لم يتم إنشاء أي سباقات في النظام بعد</p>
                </CardContent>
              </Card>
            }
          </div>
        </TabsContent>
      </Tabs>
    </div>);

};

export default RaceSchedule;