/**
 * Exclui as chaves especificadas do tipo de objeto.
 *
 * @param obj - O objeto do qual as chaves serão excluídas.
 * @param keys - As chaves a serem excluídas do objeto, incluindo em formato de string.
 * @returns O objeto resultante após a exclusão das chaves especificadas.
 */
function excludeKeys<T extends Record<string, any>>(
  obj: T,
  keys: (keyof T | string)[],
): Omit<T, keyof T> {
  const result = { ...obj };
  keys.forEach((key) => {
    if (typeof key === "string") {
      const parts = key.split(".");
      let current = result;
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      delete current[parts[parts.length - 1]];
    } else {
      delete result[key];
    }
  });
  return result;
}

/**
 * Cria um novo objeto ou uma matriz de objetos excluindo as chaves especificadas.
 *
 * @param {Data | Data[]} data - Os dados de entrada ou uma matriz de dados.
 * @param {string[]} keys - As chaves a serem excluídas dos objetos.
 * @returns {Data | Data[]} - O objeto resultante ou uma matriz de objetos resultantes.
 */
function createDto<Data extends Record<string, any>>(
  data: Data | Data[],
  keys: (keyof Data | string)[],
): Data | Data[] {
  if (Array.isArray(data)) {
    return data.map((item) => excludeKeys(item, keys)) as Data[];
  } else {
    return excludeKeys(data, keys) as Data;
  }
}

export default createDto;
