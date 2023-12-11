export interface ISidebarItem {
  path: string
  text: string
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
  authOnly?: boolean
}

export interface SidebarSchema {
  collapsed: boolean
}
