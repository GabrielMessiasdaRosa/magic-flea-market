/* export const NavbarMenuItems = [
  "Home",
  "Cartas",
  "Chat",
  "Want List",
  "Log Out",
]; */

export const NavbarMenuItems = [
  {
    name: "Mercado",
    path: "/",
    icon: "home",
    private: false,
  },
  {
    name: "Todas as cartas",
    path: "/cards",
    icon: "cards",
    private: false,
  },
  {
    name: "Chat",
    path: "/chat",
    icon: "chat",
    private: true,
  },
  {
    name: "Want List",
    path: "/wantlist",
    icon: "wantlist",
    private: true,
  },
];
