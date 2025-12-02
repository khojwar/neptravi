"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { NavigationLinks } from "./NavigationLinks";
import { Button } from "./ui/button";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden p-2">
          <Menu className="h-6 w-6 cursor-pointer" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[350px] sm:w-[400px] mt-16 ml-2 bg-gray-600/90 text-white md:hidden">
        <nav className="flex flex-col gap-4 mt-2 px-8">
          <NavigationLinks
            onLinkClick={() => setOpen(false)} // close menu
          />
          <Button variant='custom' className='w-full mt-4'>Login</Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
