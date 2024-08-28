import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "../components/ui/sheet"
import { GiHamburgerMenu } from "react-icons/gi";
import { navList } from "../constants";
import { cn } from "../lib/utils";

const MobileNav = () => {
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger><GiHamburgerMenu /></SheetTrigger>
                <SheetContent className="w-[250px]">
                    <SheetHeader>
                        <a href='/'>
                            <p className='text-xl text-gray-800 cursor-pointer flex items-center gap-2'>
                                SharePoint <span className='font-semibold text-black'>| sapiens</span>
                            </p>
                        </a>
                    </SheetHeader>
                    <nav className='flex flex-col gap-5 mt-5'>
                        {navList.map((list) => (
                            <p key={list} className={cn('text-base font-medium cursor-pointer', { "text-[#00cc6a]": list === "Events" })}>
                                {list === "Events" ? (
                                    <SheetClose asChild>
                                        <a href='/events'>{list}</a>
                                    </SheetClose>
                                ) : list}
                            </p>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNav