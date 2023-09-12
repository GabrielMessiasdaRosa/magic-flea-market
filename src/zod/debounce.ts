function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeoutId: NodeJS.Timeout | null;

  return function (...args: Parameters<T>): Promise<ReturnType<T>> {
    return new Promise<ReturnType<T>>((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const result = func(...args);
        resolve(result);
      }, delay);
    });
  };
}
/* 
// Exemplo de uso:
function search(query: string): Promise<string> {
  // Simulando uma pesquisa assíncrona
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Resultados da pesquisa para "${query}"`);
    }, 1000);
  });
}

const debouncedSearch = debounce(search, 500);

// Chamada da função debouncada
debouncedSearch("termo de pesquisa 1").then((result) => {
  console.log(result);
});

// Chamada da função debouncada novamente dentro do intervalo de debounce
debouncedSearch("termo de pesquisa 2").then((result) => {
  console.log(result);
});

// Chamada da função debouncada após o intervalo de debounce
setTimeout(() => {
  debouncedSearch("termo de pesquisa 3").then((result) => {
    console.log(result);
  });
}, 1000); */

export default debounce;
