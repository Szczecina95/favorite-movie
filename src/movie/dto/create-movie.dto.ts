import { IsArray, IsString, IsOptional, MaxLength, IsIn, IsNotEmpty, Max } from 'class-validator';
import { Genres, Movie } from '../movie.types';
import moviesData from '../../db/db.json'

export class CreateMovieDTO implements Omit<Movie, 'id'> {
    @IsArray({ message: 'Genres must be an array of predefined strings.' })
    @IsIn(moviesData.genres, { each: true, message: 'Invalid genre selected.' })
    @IsNotEmpty({ message: 'Genres are required.' })
    genres!: Genres[];
  
    @IsString({ message: 'Title must be a string.' })
    @MaxLength(255, { message: 'Title cannot exceed 255 characters.' })
    @IsNotEmpty({ message: 'Title is required.' })
    title!: string;
  
    @IsString({ message: 'Year must be a string.' })
    @IsNotEmpty({ message: 'Year is required.' })
    @MaxLength(4, {message: 'Year cannot have more than 4 digits'})
    year!: string;
  
    @IsString({ message: 'Runtime must be a string.' })
    @IsNotEmpty({ message: 'Runtime is required.' })
    runtime!: string;
  
    @IsString({ message: 'Director must be a string.' })
    @MaxLength(255, { message: 'Director cannot exceed 255 characters.' })
    @IsNotEmpty({ message: 'Director is required.' })
    director!: string;
  
    @IsOptional()
    @IsString({ message: 'Actors must be a string.' })
    actors?: string;
  
    @IsOptional()
    @IsString({ message: 'Plot must be a string.' })
    plot?: string;
  
    @IsOptional()
    @IsString({ message: 'Poster URL must be a string.' })
    posterUrl?: string;
  }
  
