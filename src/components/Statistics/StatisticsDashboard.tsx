import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useData } from '@/hooks/useData';
import { Trophy, Users, Calendar, Award, TrendingUp, Star, Crown, Target } from 'lucide-react';

const StatisticsDashboard: React.FC = () => {
  const { races, horses, results } = useData();

  // Calculate statistics
  const totalRaces = races.length;
  const totalHorses = horses.length;
  const completedRaces = races.filter((race) => race.status === 'completed').length;
  const upcomingRaces = races.filter((race) => race.status === 'upcoming').length;
  const totalOwners = [...new Set(horses.map((horse) => horse.ownerId))].length;

  // Horse statistics
  const horseStats = horses.map((horse) => {
    const horseResults = results.filter((result) => result.horseId === horse.id);
    const wins = horseResults.filter((result) => result.position === 1).length;
    const podiums = horseResults.filter((result) => result.position <= 3).length;
    const winRate = horse.races > 0 ? wins / horse.races * 100 : 0;

    return {
      ...horse,
      actualWins: wins,
      podiums,
      winRate,
      participations: horseResults.length
    };
  }).sort((a, b) => b.actualWins - a.actualWins);

  const topHorses = horseStats.slice(0, 5);

  // Owner statistics
  const ownerStats = horses.reduce((acc, horse) => {
    if (!acc[horse.ownerId]) {
      acc[horse.ownerId] = {
        ownerName: horse.ownerName,
        ownerId: horse.ownerId,
        horses: [],
        totalWins: 0,
        totalRaces: 0
      };
    }
    acc[horse.ownerId].horses.push(horse);
    acc[horse.ownerId].totalWins += horse.wins;
    acc[horse.ownerId].totalRaces += horse.races;
    return acc;
  }, {} as Record<string, any>);

  const topOwners = Object.values(ownerStats).
  sort((a: any, b: any) => b.totalWins - a.totalWins).
  slice(0, 5);

  // Recent results
  const recentResults = results.
  sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).
  slice(0, 10);

  // Race statistics by month
  const racesByMonth = races.reduce((acc, race) => {
    const month = new Date(race.date).toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getPerformanceLevel = (winRate: number) => {
    if (winRate >= 70) return { label: 'ممتاز', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (winRate >= 50) return { label: 'جيد جداً', color: 'text-blue-600', bgColor: 'bg-blue-50' };
    if (winRate >= 30) return { label: 'جيد', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    return { label: 'متوسط', color: 'text-gray-600', bgColor: 'bg-gray-50' };
  };

  return (
    <div className="p-6 space-y-6" dir="rtl" data-id="dny5u2xzn" data-path="src/components/Statistics/StatisticsDashboard.tsx">
      <div data-id="ykznrb34d" data-path="src/components/Statistics/StatisticsDashboard.tsx">
        <h1 className="text-3xl font-bold text-gray-900" data-id="4tt100dd2" data-path="src/components/Statistics/StatisticsDashboard.tsx">الإحصائيات والتقارير</h1>
        <p className="text-gray-600 mt-2" data-id="bbuyvwwtv" data-path="src/components/Statistics/StatisticsDashboard.tsx">نظرة شاملة على أداء السباقات والخيول</p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-id="jfkkz7xoi" data-path="src/components/Statistics/StatisticsDashboard.tsx">
        <Card data-id="j2totnru3" data-path="src/components/Statistics/StatisticsDashboard.tsx">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="pu4jxreii" data-path="src/components/Statistics/StatisticsDashboard.tsx">
            <CardTitle className="text-sm font-medium" data-id="8vqmh93g9" data-path="src/components/Statistics/StatisticsDashboard.tsx">إجمالي السباقات</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" data-id="byc11rdj0" data-path="src/components/Statistics/StatisticsDashboard.tsx" />
          </CardHeader>
          <CardContent data-id="9obulknx3" data-path="src/components/Statistics/StatisticsDashboard.tsx">
            <div className="text-2xl font-bold" data-id="0yko5mcjv" data-path="src/components/Statistics/StatisticsDashboard.tsx">{totalRaces}</div>
            <p className="text-xs text-muted-foreground" data-id="xxyybvgjd" data-path="src/components/Statistics/StatisticsDashboard.tsx">
              مكتمل: {completedRaces} | قادم: {upcomingRaces}
            </p>
          </CardContent>
        </Card>

        <Card data-id="7t39ff1qe" data-path="src/components/Statistics/StatisticsDashboard.tsx">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="1ochkjyrs" data-path="src/components/Statistics/StatisticsDashboard.tsx">
            <CardTitle className="text-sm font-medium" data-id="okmg6zlwo" data-path="src/components/Statistics/StatisticsDashboard.tsx">إجمالي الخيول</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" data-id="60y389mck" data-path="src/components/Statistics/StatisticsDashboard.tsx" />
          </CardHeader>
          <CardContent data-id="7cjfmfesm" data-path="src/components/Statistics/StatisticsDashboard.tsx">
            <div className="text-2xl font-bold" data-id="rsjxpj20w" data-path="src/components/Statistics/StatisticsDashboard.tsx">{totalHorses}</div>
            <p className="text-xs text-muted-foreground" data-id="pdk3mmlrk" data-path="src/components/Statistics/StatisticsDashboard.tsx">
              مسجلة في النظام
            </p>
          </CardContent>
        </Card>

        <Card data-id="bbzw08mr5" data-path="src/components/Statistics/StatisticsDashboard.tsx">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="dqq2nn2xe" data-path="src/components/Statistics/StatisticsDashboard.tsx">
            <CardTitle className="text-sm font-medium" data-id="jvta2l0k4" data-path="src/components/Statistics/StatisticsDashboard.tsx">عدد المالكين</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" data-id="90rvgt51o" data-path="src/components/Statistics/StatisticsDashboard.tsx" />
          </CardHeader>
          <CardContent data-id="3bm4m598y" data-path="src/components/Statistics/StatisticsDashboard.tsx">
            <div className="text-2xl font-bold" data-id="830a9ekk2" data-path="src/components/Statistics/StatisticsDashboard.tsx">{totalOwners}</div>
            <p className="text-xs text-muted-foreground" data-id="p54lkmfwj" data-path="src/components/Statistics/StatisticsDashboard.tsx">
              مالك نشط
            </p>
          </CardContent>
        </Card>

        <Card data-id="a31bf4olk" data-path="src/components/Statistics/StatisticsDashboard.tsx">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="ke0pezxgx" data-path="src/components/Statistics/StatisticsDashboard.tsx">
            <CardTitle className="text-sm font-medium" data-id="7mtop0cw2" data-path="src/components/Statistics/StatisticsDashboard.tsx">النتائج المسجلة</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" data-id="drfeqj69b" data-path="src/components/Statistics/StatisticsDashboard.tsx" />
          </CardHeader>
          <CardContent data-id="6gzogq808" data-path="src/components/Statistics/StatisticsDashboard.tsx">
            <div className="text-2xl font-bold" data-id="xjzovq8cb" data-path="src/components/Statistics/StatisticsDashboard.tsx">{results.length}</div>
            <p className="text-xs text-muted-foreground" data-id="t0t2u4jx1" data-path="src/components/Statistics/StatisticsDashboard.tsx">
              نتيجة مكتملة
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2" data-id="7nfuu4gwv" data-path="src/components/Statistics/StatisticsDashboard.tsx">
        {/* Top Horses */}
        <Card data-id="j024lvuvt" data-path="src/components/Statistics/StatisticsDashboard.tsx">
          <CardHeader data-id="nwwru6tj3" data-path="src/components/Statistics/StatisticsDashboard.tsx">
            <CardTitle className="flex items-center gap-2" data-id="zpiu8z0wq" data-path="src/components/Statistics/StatisticsDashboard.tsx">
              <Crown className="h-5 w-5 text-yellow-600" data-id="tks8j2v38" data-path="src/components/Statistics/StatisticsDashboard.tsx" />
              أفضل الخيول أداءً
            </CardTitle>
            <CardDescription data-id="b0o0husad" data-path="src/components/Statistics/StatisticsDashboard.tsx">ترتيب الخيول حسب عدد الانتصارات ومعدل الفوز</CardDescription>
          </CardHeader>
          <CardContent data-id="0i7py68s7" data-path="src/components/Statistics/StatisticsDashboard.tsx">
            <div className="space-y-4" data-id="uqdljico6" data-path="src/components/Statistics/StatisticsDashboard.tsx">
              {topHorses.map((horse, index) => {
                const performance = getPerformanceLevel(horse.winRate);
                return (
                  <div key={horse.id} className="flex items-center justify-between p-3 rounded-lg border" data-id="2r860187s" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                    <div className="flex items-center gap-3" data-id="ju1264qn3" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold" data-id="2rky2l8ge" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                        {index + 1}
                      </div>
                      <div data-id="i7z0of5li" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                        <div className="font-semibold" data-id="yi8hai3hn" data-path="src/components/Statistics/StatisticsDashboard.tsx">{horse.name}</div>
                        <div className="text-sm text-gray-600" data-id="9vemchl1h" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                          {horse.breed} - {horse.ownerName}
                        </div>
                      </div>
                    </div>
                    <div className="text-left space-y-1" data-id="hja1bjgcy" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                      <div className="flex items-center gap-2" data-id="l5izhbqpk" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                        <Badge variant="outline" data-id="hgfxqaptb" data-path="src/components/Statistics/StatisticsDashboard.tsx">{horse.actualWins} انتصار</Badge>
                        <div className={`px-2 py-1 rounded text-xs ${performance.bgColor} ${performance.color}`} data-id="24xs8q69a" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                          {performance.label}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600" data-id="jcv5to1s6" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                        معدل الفوز: {horse.winRate.toFixed(1)}%
                      </div>
                      <Progress value={horse.winRate} className="w-20 h-2" data-id="qyqe6y045" data-path="src/components/Statistics/StatisticsDashboard.tsx" />
                    </div>
                  </div>);

              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Owners */}
        <Card data-id="5th3mbqdy" data-path="src/components/Statistics/StatisticsDashboard.tsx">
          <CardHeader data-id="kflp225u5" data-path="src/components/Statistics/StatisticsDashboard.tsx">
            <CardTitle className="flex items-center gap-2" data-id="5hzibrdc9" data-path="src/components/Statistics/StatisticsDashboard.tsx">
              <Target className="h-5 w-5 text-green-600" data-id="ubqwwxuu9" data-path="src/components/Statistics/StatisticsDashboard.tsx" />
              أفضل المالكين
            </CardTitle>
            <CardDescription data-id="4k6bccjps" data-path="src/components/Statistics/StatisticsDashboard.tsx">ترتيب المالكين حسب إجمالي الانتصارات</CardDescription>
          </CardHeader>
          <CardContent data-id="0gpk0l6yu" data-path="src/components/Statistics/StatisticsDashboard.tsx">
            <div className="space-y-4" data-id="yvzsakavq" data-path="src/components/Statistics/StatisticsDashboard.tsx">
              {topOwners.map((owner: any, index) =>
              <div key={owner.ownerId} className="flex items-center justify-between p-3 rounded-lg border" data-id="aaabzy15o" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                  <div className="flex items-center gap-3" data-id="2snogm64y" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold" data-id="6297x4gat" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                      {index + 1}
                    </div>
                    <div data-id="yftf19v8c" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                      <div className="font-semibold" data-id="8thtgtrp6" data-path="src/components/Statistics/StatisticsDashboard.tsx">{owner.ownerName}</div>
                      <div className="text-sm text-gray-600" data-id="j722sgz3b" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                        {owner.horses.length} حصان
                      </div>
                    </div>
                  </div>
                  <div className="text-left" data-id="dvtdymgiz" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                    <div className="text-lg font-bold text-green-600" data-id="acludljtu" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                      {owner.totalWins}
                    </div>
                    <div className="text-sm text-gray-600" data-id="eheuf9mfr" data-path="src/components/Statistics/StatisticsDashboard.tsx">انتصار</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Results */}
      <Card data-id="67fmswdm7" data-path="src/components/Statistics/StatisticsDashboard.tsx">
        <CardHeader data-id="tn8441rkb" data-path="src/components/Statistics/StatisticsDashboard.tsx">
          <CardTitle className="flex items-center gap-2" data-id="79ol6tjs2" data-path="src/components/Statistics/StatisticsDashboard.tsx">
            <TrendingUp className="h-5 w-5 text-purple-600" data-id="intiuvhrp" data-path="src/components/Statistics/StatisticsDashboard.tsx" />
            آخر النتائج
          </CardTitle>
          <CardDescription data-id="2nw9i51an" data-path="src/components/Statistics/StatisticsDashboard.tsx">أحدث نتائج السباقات المسجلة</CardDescription>
        </CardHeader>
        <CardContent data-id="y8i7v95ml" data-path="src/components/Statistics/StatisticsDashboard.tsx">
          {recentResults.length > 0 ?
          <div className="space-y-3" data-id="3jh9j936z" data-path="src/components/Statistics/StatisticsDashboard.tsx">
              {recentResults.map((result) =>
            <div key={result.id} className="flex items-center justify-between p-3 border rounded-lg" data-id="58s33uthr" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                  <div className="flex items-center gap-3" data-id="f6wqw9gdc" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100" data-id="ig6mm4yjt" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                      {result.position === 1 ? '🥇' : result.position === 2 ? '🥈' : result.position === 3 ? '🥉' : result.position}
                    </div>
                    <div data-id="qsansw2yr" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                      <div className="font-semibold" data-id="nzx0xixat" data-path="src/components/Statistics/StatisticsDashboard.tsx">{result.horseName}</div>
                      <div className="text-sm text-gray-600" data-id="96x36i5qc" data-path="src/components/Statistics/StatisticsDashboard.tsx">{result.raceName}</div>
                    </div>
                  </div>
                  <div className="text-left" data-id="4t3gz6zy5" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                    <div className="text-sm font-medium" data-id="cs31d2xig" data-path="src/components/Statistics/StatisticsDashboard.tsx">{result.time}</div>
                    <div className="text-xs text-gray-600" data-id="zerz2w1a9" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                      {new Date(result.createdAt).toLocaleDateString('ar-SA')}
                    </div>
                  </div>
                </div>
            )}
            </div> :

          <div className="text-center py-8" data-id="4v7ltb6r6" data-path="src/components/Statistics/StatisticsDashboard.tsx">
              <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" data-id="o948coi8i" data-path="src/components/Statistics/StatisticsDashboard.tsx" />
              <p className="text-gray-500" data-id="eugomd41z" data-path="src/components/Statistics/StatisticsDashboard.tsx">لا توجد نتائج مسجلة</p>
            </div>
          }
        </CardContent>
      </Card>

      {/* Race Activity by Month */}
      {Object.keys(racesByMonth).length > 0 &&
      <Card data-id="5wb048epl" data-path="src/components/Statistics/StatisticsDashboard.tsx">
          <CardHeader data-id="8wa1nrvu8" data-path="src/components/Statistics/StatisticsDashboard.tsx">
            <CardTitle className="flex items-center gap-2" data-id="u2l274kqf" data-path="src/components/Statistics/StatisticsDashboard.tsx">
              <Calendar className="h-5 w-5 text-blue-600" data-id="ngu0ks59m" data-path="src/components/Statistics/StatisticsDashboard.tsx" />
              نشاط السباقات الشهري
            </CardTitle>
            <CardDescription data-id="hxn5yr2zw" data-path="src/components/Statistics/StatisticsDashboard.tsx">توزيع السباقات حسب الشهر</CardDescription>
          </CardHeader>
          <CardContent data-id="wy9bfez6h" data-path="src/components/Statistics/StatisticsDashboard.tsx">
            <div className="space-y-3" data-id="a81s5t5zh" data-path="src/components/Statistics/StatisticsDashboard.tsx">
              {Object.entries(racesByMonth).map(([month, count]) =>
            <div key={month} className="flex items-center justify-between" data-id="9f9tp8xqd" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                  <span className="text-sm font-medium" data-id="ov945vsxu" data-path="src/components/Statistics/StatisticsDashboard.tsx">{month}</span>
                  <div className="flex items-center gap-2" data-id="pbt6vj7b2" data-path="src/components/Statistics/StatisticsDashboard.tsx">
                    <Progress value={count / Math.max(...Object.values(racesByMonth)) * 100} className="w-32 h-2" data-id="pqcit3dhs" data-path="src/components/Statistics/StatisticsDashboard.tsx" />
                    <span className="text-sm text-gray-600 w-8" data-id="08sy2l0pp" data-path="src/components/Statistics/StatisticsDashboard.tsx">{count}</span>
                  </div>
                </div>
            )}
            </div>
          </CardContent>
        </Card>
      }
    </div>);

};

export default StatisticsDashboard;