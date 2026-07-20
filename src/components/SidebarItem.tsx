import type { SidebarItemProps } from "../interfaces/FormInterfaces";

function SidebarItem({ icon, children }:SidebarItemProps) {
  return (
    <button
      className="
        w-full
        flex
        items-center
        gap-3
        px-3
        py-2
        rounded-lg
        text-sm
        text-zinc-300
        hover:bg-zinc-800
        hover:text-white
        transition
        cursor-pointer
      "
    >
      {icon}

      <span className="truncate">
        {children}
      </span>
    </button>
  );
}

export default SidebarItem;