import { Calendar, MousePointerClick, Info, ChevronsUpDown, Minus, Loader } from "lucide-react"

export const uiComponents = [
  {
    slug: "datepicker",
    name: "Datepicker",
    icon: Calendar,
    description: "A date selection picker with keyboard and range support.",
  },
  {
    slug: "button",
    name: "Button",
    icon: MousePointerClick,
    description: "Pressable element with variants and sizes.",
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    icon: Info,
    description: "Small contextual info shown on hover or focus.",
  },
  {
    slug: "collapsible",
    name: "Collapsible",
    icon: ChevronsUpDown,
    description: "Expand and collapse content sections.",
  },
  {
    slug: "separator",
    name: "Separator",
    icon: Minus,
    description: "Visual divider between content blocks.",
  },
  {
    slug: "spinner",
    name: "Spinner",
    icon: Loader,
    description: "Loading indicator for async states.",
  },
]
