import { Calendar, LoaderCircle, MousePointerClick, Rows3 } from "lucide-react"

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
  {
    slug: "checkpoint-rail",
    name: "Checkpoint Rail",
    icon: Rows3,
    description: "Vertical rail of checkpoint lines for jumping through a chat.",
  },
]
