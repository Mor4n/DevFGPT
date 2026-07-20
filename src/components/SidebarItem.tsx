import type { SidebarItemProps } from "../interfaces/FormInterfaces";

function SidebarItem({ icon, children, onClick, active }: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full
        flex
        items-center
        gap-3
        px-3
        py-2
        rounded-lg
        text-sm
        transition
        cursor-pointer
        ${active 
          ? "bg-zinc-800 text-white font-medium" 
          : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
        }
      `}
    >
      {icon}

      <span className="truncate flex-1 text-left">
        {children}
      </span>
    </button>
  );
}

export default SidebarItem;