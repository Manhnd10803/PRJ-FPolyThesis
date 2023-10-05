import { ModeToggle } from '@/components/shared';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <h1 className='block relative'>
      <span className='home'>Home</span>
      <Button>Button</Button>
      <ModeToggle />
    </h1>
  );
}
