import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { FavouritesProvider, useFavourites } from '../context/FavouritesContext'

const mockProperty = {
  id: 'prop1',
  type: 'House',
  bedrooms: 3,
  price: 750000,
  tenure: 'Freehold',
  description:  'Test property',
  location: 'Test Location',
  picture: '/test. jpg',
  added: { month: 'October', day:  12, year: 2022 }
}

const mockProperty2 = {
  id:  'prop2',
  type: 'Flat',
  bedrooms: 2,
  price: 400000,
  tenure: 'Leasehold',
  description: 'Test property 2',
  location: 'Test Location 2',
  picture: '/test2.jpg',
  added: { month: 'September', day: 14, year: 2022 }
}

describe('FavouritesContext', () => {
  beforeEach(() => {
    localStorage. clear()
  })

  it('initializes with empty favourites', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    })

    expect(result.current. favourites).toEqual([])
    expect(result.current.favouritesCount).toBe(0)
  })

  it('adds a property to favourites', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    })

    act(() => {
      result.current.addFavourite(mockProperty)
    })

    expect(result. current.favourites).toHaveLength(1)
    expect(result.current.favourites[0]).toEqual(mockProperty)
    expect(result.current.favouritesCount).toBe(1)
  })

  it('removes a property from favourites', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    })

    // Add property first
    act(() => {
      result.current.addFavourite(mockProperty)
    })

    expect(result.current.favouritesCount).toBe(1)

    // Remove property
    act(() => {
      result.current.removeFavourite(mockProperty. id)
    })

    expect(result.current.favourites).toHaveLength(0)
    expect(result.current. favouritesCount).toBe(0)
  })

  it('checks if a property is favourited', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    })

    // Initially not favourited
    expect(result. current.isFavourite(mockProperty.id)).toBe(false)

    // Add to favourites
    act(() => {
      result.current.addFavourite(mockProperty)
    })

    // Now should be favourited
    expect(result.current.isFavourite(mockProperty.id)).toBe(true)
  })

  it('toggles favourite status', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    })

    // Toggle on (add)
    act(() => {
      result.current.toggleFavourite(mockProperty)
    })

    expect(result.current.isFavourite(mockProperty.id)).toBe(true)
    expect(result.current.favouritesCount).toBe(1)

    // Toggle off (remove)
    act(() => {
      result.current.toggleFavourite(mockProperty)
    })

    expect(result.current.isFavourite(mockProperty.id)).toBe(false)
    expect(result.current.favouritesCount).toBe(0)
  })

  it('prevents duplicate favourites', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    })

    // Add same property twice
    act(() => {
      result.current.addFavourite(mockProperty)
      result.current.addFavourite(mockProperty)
    })

    // Should only have one instance
    expect(result.current.favourites).toHaveLength(1)
    expect(result.current.favouritesCount).toBe(1)
  })

  it('handles multiple favourites', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    })

    // Add multiple properties
    act(() => {
      result.current.addFavourite(mockProperty)
      result.current.addFavourite(mockProperty2)
    })

    expect(result.current.favourites).toHaveLength(2)
    expect(result.current.favouritesCount).toBe(2)
    expect(result.current.isFavourite(mockProperty.id)).toBe(true)
    expect(result.current.isFavourite(mockProperty2.id)).toBe(true)
  })

  it('clears all favourites', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    })

    // Add multiple properties
    act(() => {
      result.current.addFavourite(mockProperty)
      result.current. addFavourite(mockProperty2)
    })

    expect(result.current.favouritesCount).toBe(2)

    // Clear all
    act(() => {
      result.current. clearFavourites()
    })

    expect(result.current.favourites).toHaveLength(0)
    expect(result.current.favouritesCount).toBe(0)
  })

  it('persists favourites to localStorage', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: FavouritesProvider
    })

    // Add favourite
    act(() => {
      result.current.addFavourite(mockProperty)
    })

    // Check localStorage
    const stored = localStorage.getItem('checkEstateFavourites')
    expect(stored).toBeTruthy()
    const parsed = JSON.parse(stored)
    expect(parsed).toHaveLength(1)
    expect(parsed[0]. id).toBe(mockProperty.id)
  })
})