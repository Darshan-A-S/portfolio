import { Calendar, LoaderCircle, MousePointerClick } from "lucide-react"

export const uiComponents = [
  {
    slug: "datepicker",
    name: "Datepicker",
    icon: Calendar,
    description: "Calendar popover for picking a single date.",
  },
  {
    slug: "button",
    name: "Button",
    icon: MousePointerClick,
    description: "Pressable element with variants and sizes.",
  },
  {
    slug: "loader",
    name: "Loader",
    icon: LoaderCircle,
    description: "Status indicator with cycling phrases and growing dots.",
  },
]
