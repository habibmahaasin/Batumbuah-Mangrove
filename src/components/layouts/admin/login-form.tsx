// components/login-form.tsx
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  formAction?: (formData: FormData) => void | Promise<void>;
}

export function LoginForm({ className, formAction, ...props }: LoginFormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2 min-h-[80vh]'>
          <div
            className='bg-muted relative hidden md:block'
            style={{
              backgroundImage: "url('/mangrove.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>

          <form
            className='p-6 md:p-8 flex flex-col justify-center'
            action={formAction}
          >
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center text-center'>
                <h1 className='text-2xl font-bold'>Welcome back</h1>
                <p className='text-muted-foreground text-balance'>
                  Login to your Batumbuah Admin Account
                </p>
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='admin@batumbuah.com'
                  required
                />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='**********'
                  required
                />
              </div>
              <Button type='submit' className='w-full'>
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
