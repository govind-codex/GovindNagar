import { cn } from "@/lib/utils";
import { Slot, Slottable } from "@radix-ui/react-slot";

export function GlowFillButton(
  props: React.ComponentProps<"button"> & {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    asChild?: boolean;
  },
) {
  const {
    asChild = false,
    children,
    className,
    icon: Icon,
    type,
    ...buttonProps
  } = props;
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      {...buttonProps}
      {...(!asChild && { type: type ?? "button" })}
      className={cn(
        "group/button relative inline-flex cursor-pointer items-center justify-between overflow-hidden rounded-full border border-black/30 bg-neutral-100 py-[3px] pr-[3px] pl-2 text-base font-medium opacity-85 backdrop-blur-xs transition-all hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:py-1 md:pr-1 md:pl-3 dark:border-white/10 dark:bg-white/10 motion-reduce:transition-none",
        className,
      )}
    >
      {asChild ? (
        <Slottable>{children}</Slottable>
      ) : (
        <span className="z-10 px-3 text-black transition-colors duration-300 group-hover/button:text-white dark:text-white dark:group-hover/button:text-black">
          {children}
        </span>
      )}
      <span className="absolute inset-0 translate-x-[45%] scale-0 rounded-full bg-black opacity-0 transition-all duration-300 ease-in-out group-hover/button:translate-x-0 group-hover/button:scale-100 group-hover/button:opacity-100 dark:bg-white" />
      <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-black p-2 transition-colors duration-300 group-hover/button:bg-transparent md:p-2.5 dark:bg-white">
        <Icon
          className="lucide lucide-arrow-right text-white transition-all duration-300 group-hover/button:translate-x-5 group-hover/button:opacity-0 dark:text-black"
          aria-hidden="true"
        />

        <Icon
          className="lucide lucide-arrow-right absolute -translate-x-5 text-white opacity-0 transition-all duration-300 group-hover/button:translate-x-0 group-hover/button:opacity-100 dark:text-black"
          aria-hidden="true"
        />
      </span>
    </Comp>
  );
}
