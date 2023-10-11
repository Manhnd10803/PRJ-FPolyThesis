import { ModeToggle } from '@/components/shared/mode-toggle';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <h1 className='block relative'>
      <span className='home'>Home</span>
      <Button>Button</Button>
      <ModeToggle />
    </h1>
  );
}
