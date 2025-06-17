import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, HelpCircle, Bug } from 'lucide-react';

const ContactSupport: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form submission
    toast({
      title: "تم إرسال رسالتك بنجاح",
      description: "سنتواصل معك في أقرب وقت ممكن"
    });

    // Reset form
    setFormData({
      subject: '',
      category: '',
      message: '',
      priority: 'medium'
    });
  };

  const contactInfo = [
  {
    icon: Phone,
    title: 'الهاتف',
    details: '+966 11 123 4567',
    description: 'متاح 24/7 للحالات العاجلة'
  },
  {
    icon: Mail,
    title: 'البريد الإلكتروني',
    details: 'support@horserace.sa',
    description: 'نرد خلال 24 ساعة'
  },
  {
    icon: MapPin,
    title: 'العنوان',
    details: 'الرياض، المملكة العربية السعودية',
    description: 'مجمع الفروسية الملكي'
  },
  {
    icon: Clock,
    title: 'ساعات العمل',
    details: 'الأحد - الخميس: 8ص - 5م',
    description: 'دعم فني على مدار الساعة'
  }];


  const faqData = [
  {
    question: 'كيف يمكنني تسجيل حصان جديد؟',
    answer: 'انتقل إلى قسم "إدارة الخيول" واضغط على "إضافة حصان جديد". املأ جميع البيانات المطلوبة واضغط على "حفظ".'
  },
  {
    question: 'ما هي شروط التسجيل في السباقات؟',
    answer: 'يجب أن يكون الحصان مسجلاً في النظام، ويتوافق مع فئة العمر المطلوبة، وألا يتجاوز العدد المسموح في السباق.'
  },
  {
    question: 'كيف يتم تحديد نتائج السباقات؟',
    answer: 'الحكام المعتمدون هم الوحيدون المخولون لتسجيل النتائج من خلال لوحة التحكم الخاصة بهم.'
  },
  {
    question: 'هل يمكنني تعديل بيانات الحصان بعد التسجيل؟',
    answer: 'نعم، يمكن للمالكين تعديل بعض البيانات غير الأساسية مثل اسم المدرب والوزن.'
  }];


  return (
    <div className="p-6 space-y-6" dir="rtl" data-id="kl4p5s2i1" data-path="src/components/Contact/ContactSupport.tsx">
      <div data-id="e7jy598xx" data-path="src/components/Contact/ContactSupport.tsx">
        <h1 className="text-3xl font-bold text-gray-900" data-id="q7mw76rnr" data-path="src/components/Contact/ContactSupport.tsx">الدعم والتواصل</h1>
        <p className="text-gray-600 mt-2" data-id="ejbm3kv44" data-path="src/components/Contact/ContactSupport.tsx">نحن هنا لمساعدتك في أي استفسار أو مشكلة تواجهها</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3" data-id="104cywo0w" data-path="src/components/Contact/ContactSupport.tsx">
        <div className="lg:col-span-2 space-y-6" data-id="s7txsv74t" data-path="src/components/Contact/ContactSupport.tsx">
          {/* Contact Form */}
          <Card data-id="7hd1bvwz9" data-path="src/components/Contact/ContactSupport.tsx">
            <CardHeader data-id="pj5e04jx3" data-path="src/components/Contact/ContactSupport.tsx">
              <CardTitle className="flex items-center gap-2" data-id="6ktb3e4pr" data-path="src/components/Contact/ContactSupport.tsx">
                <Send className="h-5 w-5" data-id="jyavzb4cp" data-path="src/components/Contact/ContactSupport.tsx" />
                إرسال رسالة
              </CardTitle>
              <CardDescription data-id="48n7vflb6" data-path="src/components/Contact/ContactSupport.tsx">
                اترك رسالتك وسنتواصل معك في أقرب وقت
              </CardDescription>
            </CardHeader>
            <CardContent data-id="iz6d19vat" data-path="src/components/Contact/ContactSupport.tsx">
              <form onSubmit={handleSubmit} className="space-y-4" data-id="zbbezxt6u" data-path="src/components/Contact/ContactSupport.tsx">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="2ycqcbf1b" data-path="src/components/Contact/ContactSupport.tsx">
                  <div className="space-y-2" data-id="0hvqbn4c7" data-path="src/components/Contact/ContactSupport.tsx">
                    <Label htmlFor="subject" data-id="c0my927cw" data-path="src/components/Contact/ContactSupport.tsx">موضوع الرسالة</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="اكتب موضوع رسالتك"
                      required data-id="jjted1e5u" data-path="src/components/Contact/ContactSupport.tsx" />

                  </div>
                  <div className="space-y-2" data-id="zac5ptp1c" data-path="src/components/Contact/ContactSupport.tsx">
                    <Label htmlFor="category" data-id="3dolr14rc" data-path="src/components/Contact/ContactSupport.tsx">نوع الاستفسار</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)} data-id="brm8r3l6o" data-path="src/components/Contact/ContactSupport.tsx">
                      <SelectTrigger data-id="9i96hnfpk" data-path="src/components/Contact/ContactSupport.tsx">
                        <SelectValue placeholder="اختر نوع الاستفسار" data-id="4dt3a8jc8" data-path="src/components/Contact/ContactSupport.tsx" />
                      </SelectTrigger>
                      <SelectContent data-id="uah4adlut" data-path="src/components/Contact/ContactSupport.tsx">
                        <SelectItem value="technical" data-id="lxcn2yoh6" data-path="src/components/Contact/ContactSupport.tsx">مشكلة تقنية</SelectItem>
                        <SelectItem value="registration" data-id="mhkaxegdu" data-path="src/components/Contact/ContactSupport.tsx">تسجيل خيول</SelectItem>
                        <SelectItem value="races" data-id="nal6bbkkx" data-path="src/components/Contact/ContactSupport.tsx">سؤال عن السباقات</SelectItem>
                        <SelectItem value="results" data-id="sluqjz88i" data-path="src/components/Contact/ContactSupport.tsx">النتائج والإحصائيات</SelectItem>
                        <SelectItem value="account" data-id="wdcz5b4pe" data-path="src/components/Contact/ContactSupport.tsx">مشاكل الحساب</SelectItem>
                        <SelectItem value="general" data-id="q623cnblg" data-path="src/components/Contact/ContactSupport.tsx">استفسار عام</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2" data-id="ikuwghuem" data-path="src/components/Contact/ContactSupport.tsx">
                  <Label htmlFor="priority" data-id="x2i3yidt0" data-path="src/components/Contact/ContactSupport.tsx">أولوية الرسالة</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)} data-id="uohczsy4b" data-path="src/components/Contact/ContactSupport.tsx">
                    <SelectTrigger data-id="0u3sg3g50" data-path="src/components/Contact/ContactSupport.tsx">
                      <SelectValue data-id="snz6aaf6r" data-path="src/components/Contact/ContactSupport.tsx" />
                    </SelectTrigger>
                    <SelectContent data-id="hgpbj6cej" data-path="src/components/Contact/ContactSupport.tsx">
                      <SelectItem value="low" data-id="f04q305t3" data-path="src/components/Contact/ContactSupport.tsx">منخفضة</SelectItem>
                      <SelectItem value="medium" data-id="waxs5eybt" data-path="src/components/Contact/ContactSupport.tsx">متوسطة</SelectItem>
                      <SelectItem value="high" data-id="n231e5er5" data-path="src/components/Contact/ContactSupport.tsx">عالية</SelectItem>
                      <SelectItem value="urgent" data-id="rugc7r9ys" data-path="src/components/Contact/ContactSupport.tsx">عاجلة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2" data-id="7il7l9p40" data-path="src/components/Contact/ContactSupport.tsx">
                  <Label htmlFor="message" data-id="klppnt1aw" data-path="src/components/Contact/ContactSupport.tsx">الرسالة</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="اكتب رسالتك بالتفصيل..."
                    rows={6}
                    required data-id="pn9fddz2c" data-path="src/components/Contact/ContactSupport.tsx" />

                </div>

                <Button type="submit" className="w-full" data-id="23sw8hm1r" data-path="src/components/Contact/ContactSupport.tsx">
                  <Send className="h-4 w-4 ml-2" data-id="284hgoyvn" data-path="src/components/Contact/ContactSupport.tsx" />
                  إرسال الرسالة
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card data-id="8lzhd0rxy" data-path="src/components/Contact/ContactSupport.tsx">
            <CardHeader data-id="tnqu4n0u6" data-path="src/components/Contact/ContactSupport.tsx">
              <CardTitle className="flex items-center gap-2" data-id="0xvv42oby" data-path="src/components/Contact/ContactSupport.tsx">
                <HelpCircle className="h-5 w-5" data-id="v6l7j0hsc" data-path="src/components/Contact/ContactSupport.tsx" />
                الأسئلة الشائعة
              </CardTitle>
              <CardDescription data-id="ql96br0vc" data-path="src/components/Contact/ContactSupport.tsx">
                إجابات على أكثر الأسئلة شيوعاً
              </CardDescription>
            </CardHeader>
            <CardContent data-id="1875ornb3" data-path="src/components/Contact/ContactSupport.tsx">
              <div className="space-y-4" data-id="28sbfm0br" data-path="src/components/Contact/ContactSupport.tsx">
                {faqData.map((faq, index) =>
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0" data-id="q9sj8n4l8" data-path="src/components/Contact/ContactSupport.tsx">
                    <h3 className="font-semibold text-gray-900 mb-2" data-id="4wtzlm61v" data-path="src/components/Contact/ContactSupport.tsx">{faq.question}</h3>
                    <p className="text-gray-600 text-sm" data-id="pfg8rxuqe" data-path="src/components/Contact/ContactSupport.tsx">{faq.answer}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6" data-id="mgpnbposj" data-path="src/components/Contact/ContactSupport.tsx">
          {/* Contact Information */}
          <Card data-id="oq2v5p6kz" data-path="src/components/Contact/ContactSupport.tsx">
            <CardHeader data-id="enr43mm3p" data-path="src/components/Contact/ContactSupport.tsx">
              <CardTitle className="flex items-center gap-2" data-id="60xxwa8zv" data-path="src/components/Contact/ContactSupport.tsx">
                <MessageCircle className="h-5 w-5" data-id="gsjvj6jnc" data-path="src/components/Contact/ContactSupport.tsx" />
                معلومات التواصل
              </CardTitle>
              <CardDescription data-id="ecsb8xg8v" data-path="src/components/Contact/ContactSupport.tsx">
                طرق التواصل المختلفة معنا
              </CardDescription>
            </CardHeader>
            <CardContent data-id="b1p4lnf6q" data-path="src/components/Contact/ContactSupport.tsx">
              <div className="space-y-4" data-id="65sw0mr4m" data-path="src/components/Contact/ContactSupport.tsx">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50" data-id="vhlryuzbq" data-path="src/components/Contact/ContactSupport.tsx">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100" data-id="phfvp7wl0" data-path="src/components/Contact/ContactSupport.tsx">
                        <Icon className="h-5 w-5 text-blue-600" data-id="bvntrvowm" data-path="src/components/Contact/ContactSupport.tsx" />
                      </div>
                      <div className="flex-1" data-id="eul24hxet" data-path="src/components/Contact/ContactSupport.tsx">
                        <h3 className="font-semibold text-gray-900" data-id="iyaovna5l" data-path="src/components/Contact/ContactSupport.tsx">{info.title}</h3>
                        <p className="text-gray-700 font-medium" data-id="vftt9hfh7" data-path="src/components/Contact/ContactSupport.tsx">{info.details}</p>
                        <p className="text-sm text-gray-600" data-id="n9s9esw4e" data-path="src/components/Contact/ContactSupport.tsx">{info.description}</p>
                      </div>
                    </div>);

                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card data-id="gxq4ge59x" data-path="src/components/Contact/ContactSupport.tsx">
            <CardHeader data-id="a3ftyynnq" data-path="src/components/Contact/ContactSupport.tsx">
              <CardTitle data-id="qja5v5v7p" data-path="src/components/Contact/ContactSupport.tsx">إجراءات سريعة</CardTitle>
              <CardDescription data-id="295klyvmv" data-path="src/components/Contact/ContactSupport.tsx">
                روابط مفيدة للمساعدة السريعة
              </CardDescription>
            </CardHeader>
            <CardContent data-id="v0xsjqxyg" data-path="src/components/Contact/ContactSupport.tsx">
              <div className="space-y-3" data-id="tcp611mv4" data-path="src/components/Contact/ContactSupport.tsx">
                <Button variant="outline" className="w-full justify-start" data-id="842nkog1d" data-path="src/components/Contact/ContactSupport.tsx">
                  <Bug className="h-4 w-4 ml-2" data-id="m1bpx2cf8" data-path="src/components/Contact/ContactSupport.tsx" />
                  الإبلاغ عن مشكلة تقنية
                </Button>
                <Button variant="outline" className="w-full justify-start" data-id="pc2wfe1k4" data-path="src/components/Contact/ContactSupport.tsx">
                  <HelpCircle className="h-4 w-4 ml-2" data-id="1xnynt7b8" data-path="src/components/Contact/ContactSupport.tsx" />
                  دليل المستخدم
                </Button>
                <Button variant="outline" className="w-full justify-start" data-id="zbehp3tbf" data-path="src/components/Contact/ContactSupport.tsx">
                  <MessageCircle className="h-4 w-4 ml-2" data-id="lb10gnwv7" data-path="src/components/Contact/ContactSupport.tsx" />
                  الدردشة المباشرة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User Info */}
          {user &&
          <Card data-id="y4na2kagr" data-path="src/components/Contact/ContactSupport.tsx">
              <CardHeader data-id="wgttm1znr" data-path="src/components/Contact/ContactSupport.tsx">
                <CardTitle data-id="xd51c21eh" data-path="src/components/Contact/ContactSupport.tsx">معلومات المستخدم</CardTitle>
              </CardHeader>
              <CardContent data-id="9883hau1s" data-path="src/components/Contact/ContactSupport.tsx">
                <div className="space-y-2" data-id="obvbhh63a" data-path="src/components/Contact/ContactSupport.tsx">
                  <div className="flex justify-between" data-id="3oohqgzwz" data-path="src/components/Contact/ContactSupport.tsx">
                    <span className="text-gray-600" data-id="4l7umelfh" data-path="src/components/Contact/ContactSupport.tsx">الاسم:</span>
                    <span className="font-medium" data-id="d133cthx0" data-path="src/components/Contact/ContactSupport.tsx">{user.name}</span>
                  </div>
                  <div className="flex justify-between" data-id="o8eszogl7" data-path="src/components/Contact/ContactSupport.tsx">
                    <span className="text-gray-600" data-id="t09hofr7s" data-path="src/components/Contact/ContactSupport.tsx">البريد:</span>
                    <span className="font-medium" data-id="ysjplmzfb" data-path="src/components/Contact/ContactSupport.tsx">{user.email}</span>
                  </div>
                  <div className="flex justify-between" data-id="78t1mxmox" data-path="src/components/Contact/ContactSupport.tsx">
                    <span className="text-gray-600" data-id="ptqwxfftv" data-path="src/components/Contact/ContactSupport.tsx">النوع:</span>
                    <span className="font-medium" data-id="3f7ctaasw" data-path="src/components/Contact/ContactSupport.tsx">
                      {user.role === 'admin' && 'مدير النظام'}
                      {user.role === 'race_organizer' && 'منظم السباقات'}
                      {user.role === 'horse_owner' && 'مالك خيول'}
                      {user.role === 'judge' && 'حكم'}
                      {user.role === 'public_viewer' && 'مشاهد عام'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          }
        </div>
      </div>
    </div>);

};

export default ContactSupport;