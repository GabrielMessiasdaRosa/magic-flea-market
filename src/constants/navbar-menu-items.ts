/* export const NavbarMenuItems = [
  "Home",
  "Cartas",
  "Chat",
  "Want List",
  "Log Out",
]; */

export const NavbarMenuItems = [
  {
    name: "Home",
    path: "/",
    icon: "home",
    private: false,
  },
  {
    name: "Cartas",
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
