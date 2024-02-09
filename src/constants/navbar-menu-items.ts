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
    path: "/market",
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
    name: "Minha Want list",
    path: "/profiles/me/my-wantlist",
    icon: "wantlist",
    private: true,
  },
];
