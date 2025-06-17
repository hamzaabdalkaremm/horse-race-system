import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في نظام إدارة سباق الخيل"
        });
      } else {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "خطأ في النظام",
        description: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
  { email: 'admin@races.com', password: 'admin123', role: 'مدير النظام' },
  { email: 'organizer@races.com', password: 'org123', role: 'منظم السباقات' },
  { email: 'owner@races.com', password: 'owner123', role: 'مالك خيول' },
  { email: 'judge@races.com', password: 'judge123', role: 'حكم' },
  { email: 'viewer@races.com', password: 'viewer123', role: 'مشاهد عام' }];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" dir="rtl" data-id="yjs374sf5" data-path="src/components/Auth/LoginForm.tsx">
      <div className="w-full max-w-md space-y-6" data-id="a1lwqa0z5" data-path="src/components/Auth/LoginForm.tsx">
        <div className="text-center" data-id="v23mugcw3" data-path="src/components/Auth/LoginForm.tsx">
          <div className="text-6xl mb-4" data-id="g83hrtz10" data-path="src/components/Auth/LoginForm.tsx">🏇</div>
          <h1 className="text-3xl font-bold text-gray-900" data-id="tjiqh55me" data-path="src/components/Auth/LoginForm.tsx">نظام إدارة سباق الخيل</h1>
          <p className="text-gray-600 mt-2" data-id="rfa10czwb" data-path="src/components/Auth/LoginForm.tsx">منصة شاملة لإدارة السباقات والخيول</p>
        </div>

        <Card data-id="sq6a1zdct" data-path="src/components/Auth/LoginForm.tsx">
          <CardHeader data-id="ayzdep2y1" data-path="src/components/Auth/LoginForm.tsx">
            <CardTitle data-id="i9m8nt9jk" data-path="src/components/Auth/LoginForm.tsx">تسجيل الدخول</CardTitle>
            <CardDescription data-id="gr4wkd5fi" data-path="src/components/Auth/LoginForm.tsx">
              أدخل بياناتك للوصول إلى النظام
            </CardDescription>
          </CardHeader>
          <CardContent data-id="iwp9hlxbl" data-path="src/components/Auth/LoginForm.tsx">
            <form onSubmit={handleSubmit} className="space-y-4" data-id="tpeo7kjrk" data-path="src/components/Auth/LoginForm.tsx">
              <div className="space-y-2" data-id="41dwkmmjd" data-path="src/components/Auth/LoginForm.tsx">
                <Label htmlFor="email" data-id="2sfkrzmce" data-path="src/components/Auth/LoginForm.tsx">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="أدخل بريدك الإلكتروني" data-id="3ze80pgy7" data-path="src/components/Auth/LoginForm.tsx" />

              </div>
              
              <div className="space-y-2" data-id="ajd7zi1my" data-path="src/components/Auth/LoginForm.tsx">
                <Label htmlFor="password" data-id="gn6za8mgm" data-path="src/components/Auth/LoginForm.tsx">كلمة المرور</Label>
                <div className="relative" data-id="yl3qredhy" data-path="src/components/Auth/LoginForm.tsx">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="أدخل كلمة المرور" data-id="4n09ui60f" data-path="src/components/Auth/LoginForm.tsx" />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)} data-id="6nmsvhdod" data-path="src/components/Auth/LoginForm.tsx">

                    {showPassword ? <EyeOff className="h-4 w-4" data-id="h1v9svmd5" data-path="src/components/Auth/LoginForm.tsx" /> : <Eye className="h-4 w-4" data-id="2gaqiuvy1" data-path="src/components/Auth/LoginForm.tsx" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading} data-id="w9ioja6yl" data-path="src/components/Auth/LoginForm.tsx">
                {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card data-id="o7wykm384" data-path="src/components/Auth/LoginForm.tsx">
          <CardHeader data-id="j1031qqh1" data-path="src/components/Auth/LoginForm.tsx">
            <CardTitle className="text-lg" data-id="bj4o3nwc3" data-path="src/components/Auth/LoginForm.tsx">حسابات تجريبية</CardTitle>
            <CardDescription data-id="6y9ce136x" data-path="src/components/Auth/LoginForm.tsx">
              يمكنك استخدام الحسابات التالية للتجربة:
            </CardDescription>
          </CardHeader>
          <CardContent data-id="pvjlu4b7l" data-path="src/components/Auth/LoginForm.tsx">
            <div className="space-y-3" data-id="p46diale1" data-path="src/components/Auth/LoginForm.tsx">
              {demoAccounts.map((account, index) =>
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg" data-id="v57pa1hhl" data-path="src/components/Auth/LoginForm.tsx">
                  <div data-id="jk2ic5g6p" data-path="src/components/Auth/LoginForm.tsx">
                    <div className="font-medium text-sm" data-id="if7n7b5q9" data-path="src/components/Auth/LoginForm.tsx">{account.role}</div>
                    <div className="text-xs text-gray-600" data-id="xjatix2i6" data-path="src/components/Auth/LoginForm.tsx">{account.email}</div>
                  </div>
                  <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail(account.email);
                    setPassword(account.password);
                  }} data-id="r5u9o7bk0" data-path="src/components/Auth/LoginForm.tsx">

                    استخدام
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default LoginForm;