import { ModeToggle } from '@/components/shared';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className='container'>
      <h1 className='block relative'>
        <span className='home'>Home</span>
        <Button>Button</Button>
        <ModeToggle />
      </h1>
    </div>
  );
}
