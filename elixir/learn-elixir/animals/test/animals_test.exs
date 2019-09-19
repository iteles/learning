defmodule AnimalsTest do
  use ExUnit.Case
  doctest Animals

  test "greets the world" do
    assert Animals.hello() == :world
  end
end
