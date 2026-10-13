export const ROLES = {
  ADMINISTRADOR: "Administrador",
  VENDEDOR: "Vendedor",
  CLIENTE: "Cliente",
};

export const TIPOS_USUARIO = [ROLES.CLIENTE, ROLES.VENDEDOR, ROLES.ADMINISTRADOR];

// Quién puede entrar a cada zona del panel.
export const ROLES_PANEL = [ROLES.ADMINISTRADOR, ROLES.VENDEDOR];
export const ROLES_SOLO_ADMIN = [ROLES.ADMINISTRADOR];
