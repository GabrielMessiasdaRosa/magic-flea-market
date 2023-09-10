/**
 * Cria um novo objeto ou uma matriz de objetos excluindo as chaves especificadas.
 *
 * @param {Data | Data[]} data - Os dados de entrada ou uma matriz de dados.
 * @param {string[]} keys - As chaves a serem excluídas dos objetos.
 * @returns {Omit<Data, keyof Data> | Omit<Data, keyof Data>[]} - O objeto resultante ou uma matriz de objetos resultantes.
 */
function createDto<Data extends Record<string, any>>(
  data: Data | Data[],
  keys: (keyof Data)[],
):
  | Omit<Data, keyof (typeof keys)[number]>
  | Omit<Data, keyof (typeof keys)[number]>[] {
  if (Array.isArray(data)) {
    return data.map((item) => {
      const filteredItem: Partial<Data> = {};
      for (const key in item) {
        if (!keys.includes(key as keyof Data)) {
          filteredItem[key as keyof Data] = item[key as keyof Data];
        }
      }
      return filteredItem as Omit<Data, keyof (typeof keys)[number]>;
    });
  } else {
    const filteredItem: Partial<Data> = {};
    for (const key in data) {
      if (!keys.includes(key as keyof Data)) {
        filteredItem[key as keyof Data] = data[key as keyof Data];
      }
    }
    return filteredItem as Omit<Data, keyof (typeof keys)[number]>;
  }
}

export default createDto;
