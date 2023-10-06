import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
export default function Header() {
    return (
      
                <Link
                    to="/"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute left-8 top-4 md:left-8 md:top-8 text-xl"
                    )}
                >
                    Linkedin
                </Link>
       
    );
}
