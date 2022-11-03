import { pokeApi } from '../../api';
import { Layout } from "../../components/layouts"
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Pokemon, PokemonListResponse } from '../../interfaces';

import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { getPokemonInfo, localFavorites } from '../../utils';
import { useState } from 'react';
import confetti from 'canvas-confetti';

interface Props {
  pokemon: Pokemon;

}
const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

 

  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);
    if(isInFavorites) return;

    confetti({
      zIndex:999,
      particleCount: 100,
       spread: 160,
       angle: -100,
       origin: {
        x: 1,
        y: 0
       }
      
    });

    
    }







  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>

              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width='100%'
                height={200}
              />
              <Text h1 transform='capitalize'>
                {pokemon.name}
              </Text>
              <Text h3 transform='capitalize'>
                tipo:
              </Text>

              {pokemon.types.map((tipos, i) => {
                let tipoPokemon = tipos.type.name;
                if(tipoPokemon === 'fire'){
                  tipoPokemon = 'fuego'
                }else if(tipoPokemon === 'flying'){
                  tipoPokemon = 'volador'
                }else if(tipoPokemon === 'grass'){
                  tipoPokemon = 'planta'
                }
                else if(tipoPokemon === 'poison'){
                  tipoPokemon = 'veneno'
                }
                else if(tipoPokemon === 'water'){
                  tipoPokemon = 'agua'
                }
                else if(tipoPokemon === 'bug'){
                  tipoPokemon = 'bicho'
                }
                else if(tipoPokemon === 'electric'){
                  tipoPokemon = 'eléctrico'
                }
                else if(tipoPokemon === 'ground'){
                  tipoPokemon = 'tierra'
                }
                else if(tipoPokemon === 'rock'){
                  tipoPokemon = 'roca'
                }
                else if(tipoPokemon === 'fairy'){
                  tipoPokemon = 'hada'
                }
                else if(tipoPokemon === 'fighting'){
                  tipoPokemon = 'lucha'
                }
                else if(tipoPokemon === 'ghost'){
                  tipoPokemon = 'fantasma'
                }
                else if(tipoPokemon === 'psychic'){
                  tipoPokemon = 'psíquico'
                }
                else if(tipoPokemon === 'ice'){
                  tipoPokemon = 'hielo'
                }
                else if(tipoPokemon === 'dragon'){
                  tipoPokemon = 'dragón'
                }else{
                  tipoPokemon = 'normal'
                }
                return(
                  <Text key={i}h4 transform='capitalize'>
                {tipoPokemon}
                </Text>
                )
              })}



            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>

              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
              >
                {isInFavorites ? 'En Favoritos' : 'Guardar en Favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction='row' display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>

            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

    </Layout>
  )
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemonNames: string[] = data.results.map( pokemon => pokemon.name);

  return {
    paths: pokemonNames.map(name => ({
      params: { name }
    })),
    fallback: 'blocking'
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const pokemon = await getPokemonInfo(name);

  if (!pokemon){
    return{
      redirect: {
        destination: '/',
        permanent: false

      }
    }
  }
  return {
    props: {
      pokemon

    },
    revalidate: 86400,
  }
}

export default PokemonByNamePage;