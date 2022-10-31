
import { Layout } from '../../components/layouts';
import    { NoFavorites } from '../../components/ui';
import { useState, useEffect } from 'react';
import { localFavorites } from '../../utils';
import { FavoritePokemon } from '../../components/pokemon';


export const FavoritosPage = () => {

const [favoritePokemons, setfavoritePokemons] = useState<number[]>([]);

useEffect(() => {
 setfavoritePokemons( localFavorites.pokemons() );
}, [])

  return (
    <Layout title="Favoritos">
{
favoritePokemons.length === 0
?( <NoFavorites/> )
: (
< FavoritePokemon pokemons={favoritePokemons} />

)

}



    </Layout>
  )
};
export default FavoritosPage;
