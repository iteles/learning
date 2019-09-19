defmodule Animals do
  @moduledoc """
  Documentation for animals
  """

  @doc """
  create_zoo returns a list of animals you would find in a zoo

  ## Examples
    iex> Animals.create_zoo
    ["lion", "tiger", "gorilla", "elephant", "monkey", "giraffe"]

  """
    def create_zoo do
    ["lion", "tiger", "gorilla", "elephant", "monkey", "giraffe"]
  end

  @doc """
  randomise takes a list of zoo animals and returns a new randomised list with
  the same elements as the first.

  ## Examples

      iex> zoo = Animals.create_zoo
      iex> Animals.randomise(zoo)
      ["monkey", "tiger", "elephant", "gorilla", "giraffe", "lion"]

  """
  def randomise(zoo) do
    Enum.shuffle(zoo)
  end

  @doc """"
  contains? takes in a list of animals at the zoo and a single animal, returning
  a bool that will tell you whether than single animal exists in your list.



end
