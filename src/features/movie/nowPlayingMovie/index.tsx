import React from 'react'
import styled from '@emotion/styled';
import useNowPlayingMovie from './useNowPlayingMovie';
import Card from '../../../components/Card';
import Slider from '../../../components/Slider';

const Base = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  margin-bottom: 42px;

`;

const Title = styled.h4`
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
  padding: 12px 0 14px;
  margin-left: 10px;
`;


const NowPlayingSection: React.FC = () => {
    const { data: nowPlayingMovieResponse, isLoading } = useNowPlayingMovie();
    const getYear = (data: string) => data.split('-')[0];

    return (
        <Base>
            <Title>최근 개봉작</Title>
            {
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Slider>
                        {
                            nowPlayingMovieResponse?.data.results.map(movie => (
                                <Card
                                key={movie.id}
                                linkUrl={`/movie/${movie.id}`}
                                title={movie.title}
                                posterPath={`${process.env.REACT_APP_IMAGE_PREFIX}/w500/${movie.poster_path}`}
                                voteAverage={movie.vote_average}
                                year={getYear(movie.release_date)}
                                />
                            ))
                        }
                    </Slider>
                )
            }
        </Base>
    )
}

export default NowPlayingSection;
