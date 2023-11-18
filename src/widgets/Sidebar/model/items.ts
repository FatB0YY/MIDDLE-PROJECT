import { RoutePath } from 'app/providers/router/config/routeConfig'
import MainIcon from '../assets/icons/main-20-20.svg'
import AboutIcon from '../assets/icons/about-20-20.svg'
import ProfileIcon from '../assets/icons/profile-20-20.svg'
import ArticleIcon from 'shared/assets/icons/article-20-20.svg'

export interface ISidebarItem {
  path: string
  text: string
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
  authOnly?: boolean
}

export const SidebarItemsList: ISidebarItem[] = [
  {
    path: RoutePath.main,
    Icon: MainIcon,
    text: 'widgets.navbar.applink.main',
  },
  {
    path: RoutePath.about,
    Icon: AboutIcon,
    text: 'widgets.navbar.applink.about',
  },
  {
    path: RoutePath.profile,
    Icon: ProfileIcon,
    text: 'widgets.navbar.applink.profile',
    authOnly: true,
  },
  {
    path: RoutePath.articles,
    Icon: ArticleIcon,
    text: 'widgets.navbar.applink.articles',
    authOnly: true,
  },
]
