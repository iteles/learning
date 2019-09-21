defmodule AnimalsTest do
  use ExUnit.Case
  doctest Animals

  test "randomise" do
    zoo = Animals.create_zoo
    refute zoo == Animals.randomise(zoo)
  end
end
