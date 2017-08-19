## Mixing it up with Elixir

Trying out CodeSchool's `Mixing it up with Elixir` course, so that the practical can help with the theory.

Below I've captured the challenges as that's where the bulk of my learning lies.

### 1. Anonymous Functions

#### 1.2
Task: On the second line, invoke the anonymous function assigned to the variable and pass your own name as a string argument to it.

<img width="740" alt="screen shot 2017-08-18 at 19 41 12" src="https://user-images.githubusercontent.com/4185328/29472829-3ffbbe78-844d-11e7-9dfd-622bba98b12f.png">

#### 1.3
<img width="715" alt="screen shot 2017-08-18 at 19 42 06" src="https://user-images.githubusercontent.com/4185328/29472864-5f42a5d0-844d-11e7-82ab-55a5a628e9b2.png">

#### 1.4
<img width="715" alt="screen shot 2017-08-18 at 19 42 06" src="https://user-images.githubusercontent.com/4185328/29472893-7db8c95e-844d-11e7-8a86-c38881236c9e.png">

#### 1.5
Write an anonymous function that takes one argument called `number` and multiplies it by 2. Bind this function to the `print_double` variable.
<img width="740" alt="screen shot 2017-08-18 at 19 44 42" src="https://user-images.githubusercontent.com/4185328/29472956-ba573f3a-844d-11e7-8484-c87116562a8f.png">

#### 1.6 Running transactions
Add a third argument to the `run_transaction` function definition called `transaction`.
<img width="742" alt="screen shot 2017-08-18 at 19 45 49" src="https://user-images.githubusercontent.com/4185328/29472991-e4317d02-844d-11e7-8ec8-64efd0238f90.png">

```elixir
deposit = fn(balance, amount) -> balance + amount end
withdrawal = fn(balance, amount) -> balance - amount end

defmodule Account do
  def run_transaction(balance, amount, transaction ) do

  end
end

deposit_result = Account.run_transaction(1000, 500, deposit)
IO.puts "New balance: US$#{deposit_result}"
withdrawal_result = Account.run_transaction(1000, 30, withdrawal)
IO.puts "New balance: US$#{withdrawal_result}"
```
**Task 2:** Inside the function, define an if statement that checks if amount is greater than 10000. When that occurs, return the string "Cannot perform transaction".
```elixir
defmodule Account do
  def run_transaction(balance, amount, transaction ) do
        if amount > 10000 do
          "Cannot perform transaction"
        end
  end
end
```

**Task 3:** When amount is NOT greater than 10000, invoke the function assigned to the transaction variable, giving it the arguments balance and amount.
```elixir
deposit = fn(balance, amount) -> balance + amount end
withdrawal = fn(balance, amount) -> balance - amount end

defmodule Account do
  def run_transaction(balance, amount, transaction ) do
     if amount > 10000 do
       "Cannot perform transaction"
     else
       transaction.(balance, amount)
     end
  end
end

deposit_result = Account.run_transaction(1000, 500, deposit)
IO.puts "New balance: US$#{deposit_result}"
withdrawal_result = Account.run_transaction(1000, 30, withdrawal)
IO.puts "New balance: US$#{withdrawal_result}"
```

#### 1.7 Performing Operations
Complete each clause with the appropriate atom so that the code behaves as expected.
<img width="744" alt="screen shot 2017-08-18 at 19 53 23" src="https://user-images.githubusercontent.com/4185328/29473263-022808d4-844f-11e7-9e02-820d38866104.png">

```elixir
# ITC: This task also uses the shorthand for the anonymous function `&`, where each argument
# also has to be preceded by a `&`
perform_operation = fn
  (values, :addition ) -> Enum.reduce(values, &(&1 + &2))
  (values, :multiplication) -> Enum.reduce(values, &(&1 * &2))
end

IO.puts perform_operation.([1, 2, 3, 4], :addition)
IO.puts perform_operation.([1, 2, 3, 4], :multiplication)
```
#### 1.8 Shorthand Syntax
On line 2, rewrite the anonymous function from the previous line using the shorthand syntax.
```elixir
# print_double = fn(number) -> number * 2 end
print_double = &(&1 * 2)

IO.puts print_double.(30)
```
_Caught me out (CMO)_: the arguments have to be referred to by their number (first argument =1, second =2 and so on) and cannot be referred to in the shorthand by a name such as `number` in this case.

### 2.1 The End is the Beginning - Lists & Recursion

There are no `for` loops in Elixir so we use recursion to essentially iterate over
a list (in this case) until its empty. This is where a function calls itself with
continuously until it's told to stop.

#### 2.2. The Cons Operator
<img width="715" alt="screen shot 2017-08-19 at 10 24 13" src="https://user-images.githubusercontent.com/4185328/29485368-a7d3de06-84c8-11e7-9543-b8eb78b7f144.png">

#### 2.3 Pattern Matching Lists
**Task 1:** Complete the `list_names` function signature by adding a list as an argument to the function. The list should use the cons operator, and pattern match the first element to the `head` variable and the remaining elements to the `tail` variable.

<img width="743" alt="screen shot 2017-08-19 at 10 26 03" src="https://user-images.githubusercontent.com/4185328/29485380-dd0ff56e-84c8-11e7-8ab2-c4c29c26428f.png">
```elixir
defmodule Printer do
  def list_names( [head | tail ] ) do
    IO.puts "Name: #{head}"  
  end

# ITC: This second clause allows the recursive function to finish (every recursive
# function should have one) - when the list is empty, stop iterating over it
  def list_names([]) do
    IO.puts "Done."
  end
end

users = ["Brooke", "Aspen", "Jordan", "Glenn", "Taylor"]
Printer.list_names(users)
```
**Task 2:** On the last line of the `list_names` function, use recursion by calling the `list_names` function and passing in the `tail`, which will continue listing names while the list is not empty.
```elixir
defmodule Printer do
  def list_names( [head | tail ] ) do
    IO.puts "Name: #{head}"
    list_names(tail)
  end

  def list_names([]) do
    IO.puts "Done."
  end
end

users = ["Brooke", "Aspen", "Jordan", "Glenn", "Taylor"]
Printer.list_names(users)
```

#### 2.4 The two cases for recursion
<img width="707" alt="screen shot 2017-08-19 at 10 37 01" src="https://user-images.githubusercontent.com/4185328/29485473-65527450-84ca-11e7-999c-7e6e1d673303.png">

### 3.1 Tuples and Maps
#### 3.2 Tuple Data Types
<img width="720" alt="screen shot 2017-08-19 at 10 46 50" src="https://user-images.githubusercontent.com/4185328/29485570-ca20ce1c-84cb-11e7-85ac-febcba00131c.png">

### 3.3 Pattern Matching Tuples
Using pattern matching, assign the two values from the existing tuple to two new variables called `paradigm` and `language`.
<img width="744" alt="screen shot 2017-08-19 at 10 48 07" src="https://user-images.githubusercontent.com/4185328/29485577-ec39daf2-84cb-11e7-8842-26dbfc1b99ed.png">
```elixir
{paradigm, language}  = {:functional, "Elixir"}
IO.puts "Paradigm: #{paradigm}"
IO.puts "Language: #{language}"
```

### 3.4 Tuples in Function Signature
<img width="744" alt="screen shot 2017-08-19 at 10 49 52" src="https://user-images.githubusercontent.com/4185328/29485588-2dd9fabe-84cc-11e7-9aee-5166319e3dd4.png">
**Task 1:** On the first clause of list_transactions, add a tuple as an argument. The first element of the tuple should be `:ok` and the second element should be a variable named `content`.
```elixir
defmodule Account do
  def list_transactions( {:ok, content} ) do
    count = length(content)
    IO.puts "Transactions files: #{count}"
  end

  def list_transactions(  ) do
    IO.puts "Error listing files"
  end
end

File.ls("/home/transactions/") |> Account.list_transactions()
```
**Task 2:** On the second clause of list_transactions, add another tuple as an argument. The first element of the tuple should be :error and the second element should be explicitly ignored in order to avoid warnings.
```elixir
defmodule Account do
  def list_transactions( {:ok, content} ) do
    count = length(content)
    IO.puts "Transactions files: #{count}"
  end

  # ITC: You might have had `message` (the error message) passing in as the second
  # element in this tuple, but that would have given you a compiler warning to say
  # you weren't doing anything in the function with that message. To avoid that compiler
  # warning, you can explicitly ignore the second element of the tuple
  def list_transactions( {:error, _} ) do
    IO.puts "Error listing files"
  end
end

File.ls("/home/transactions/") |> Account.list_transactions()
```
#### 3.5 Video on Keyword lists & Defaults
#### 3.6 Two values
<img width="712" alt="screen shot 2017-08-19 at 11 20 30" src="https://user-images.githubusercontent.com/4185328/29485809-733f45ce-84d0-11e7-8b62-b7116862644a.png">

#### 3.7 Printer With Options
<img width="745" alt="screen shot 2017-08-19 at 11 22 23" src="https://user-images.githubusercontent.com/4185328/29485819-b6acd1d2-84d0-11e7-916d-6d4578b9c7b7.png">

**Task 1:** Add a second argument to the greet function called options and set its default value to an empty list [].
```elixir
defmodule Printer do
# ITC: Setting the default value of options to an empty list using `\\ [ ]` means
# that if the function greet is called with only one argument, we won't get a compiler
# error as it will take options to be an empty list
  def greet(name, options \\ [ ] ) do

    "#{greeting}, #{name}"
  end
end

Printer.greet("Carlos") |> IO.puts
Printer.greet("Sergio", prefix: "O HAI") |> IO.puts
Printer.greet("Dolores", prefix: "Olá") |> IO.puts
```
**Task 2:** Inside the greet function, read the value from the :prefix key of options and assign it to a new variable called greeting.
```elixir
defmodule Printer do
  def greet(name, options \\ [ ] ) do
    greeting = options[:prefix]
    "#{greeting}, #{name}"
  end
end

Printer.greet("Carlos") |> IO.puts
Printer.greet("Sergio", prefix: "O HAI") |> IO.puts
Printer.greet("Dolores", prefix: "Olá") |> IO.puts
```
**Task 3:** If no value is returned from the :prefix key, then assign the "Hello" string to the greeting variable.
```elixir
defmodule Printer do
  def greet(name, options \\ [ ] ) do
    greeting = options[:prefix] || "Hello"
    "#{greeting}, #{name}"
  end
end

Printer.greet("Carlos") |> IO.puts
Printer.greet("Sergio", prefix: "O HAI") |> IO.puts
Printer.greet("Dolores", prefix: "Olá") |> IO.puts
```
Result of this is:
```shell
$ elixir printer.exs
Hello, Carlos
O HAI, Sergio
Olá, Dolores
```

#### 3.8 Video of Maps
#### 3.9 Account Map
<img width="706" alt="screen shot 2017-08-19 at 12 13 26" src="https://user-images.githubusercontent.com/4185328/29486170-f1a0c896-84d7-11e7-9ffe-acab71a32f2d.png">

#### 3.10 Person Map
The different between using `Map.fetch()` and `Map.fetch!()`
+ `Map.fetch()` returns a _tuple_ when successful and an `:error` atom when unsuccessful
  + e.g. `Map.fetch(person, "age")` where age exists returns `{:ok, 31}`
+ `Map.fetch!()` returns the _value_ when successful and a **KeyError** when unsuccessful
  + e.g. `Map.fetch!(person, "age")` where age exists returns `31`

<img width="720" alt="screen shot 2017-08-19 at 12 23 32" src="https://user-images.githubusercontent.com/4185328/29486249-48bf63ca-84d9-11e7-9167-506aa19493d2.png">

#### 3.11 Map Pattern Matching
<img width="740" alt="screen shot 2017-08-19 at 12 27 52" src="https://user-images.githubusercontent.com/4185328/29486280-df4c472c-84d9-11e7-9367-d568af497750.png">

On line 2, use pattern matching to read just the value for the "age" key from the map and assign it to a new variable named age.
```elixir
person = %{ "name" => "Sam", "age" => 31 }
 %{ "age" => age} = person
IO.puts "Age is #{age}"
```
_CMO:_ I could have used `Match.fetch!()` here too (it worked when I tried it in `iex` as per the below)
but because I couldn't delete the `= person` code from CodeSchool's file,
I had to create a new map with `%{ "age" => age}` that I could pattern match with the `person` map.

> NOTE: Maps are the only type that support partial pattern matching (i.e. didn't require a match with `name` as well)

#### 3.12 Nested Map Pattern Matching
<img width="738" alt="screen shot 2017-08-19 at 14 28 15" src="https://user-images.githubusercontent.com/4185328/29487016-ae2a3616-84ea-11e7-9df6-7ddde96aea73.png">
Using pattern matching and the least amount of code, read the value of the "account" key and assign it to a new variable called account.
```elixir
person = %{ "name" => "Sam", "age" => 31,
  "bank_info" => %{ "routing" => "001002", "account" => "123123" }
}

  %{ "bank_info" => %{"account" => account}} = person
IO.puts "Bank Account is #{account}"
```

## 4. Control Flow
### 4.1 Case statement
When you find yourself using nested `if` statements, use the `case` statement instead to avoid the code smell.

On a separate note, functions like `bytesize()` are built into Elixir and can therefore be called without an enclosing module: just `bytesize(x)` instead of `Module.bytesize(x)`.

#### 4.2 `case` Tests
<img width="720" alt="screen shot 2017-08-19 at 14 47 23" src="https://user-images.githubusercontent.com/4185328/29487197-6fab1fe2-84ed-11e7-8a10-8fc290374b5e.png">

#### 4.3 Transfer with `case`
Original code:
```elixir
defmodule Account do
  def transfer_amount(from, to, amount) do
    if amount < 5000 do
      do_transfer(from, to, amount)
      { :ok, amount }
    else
      { :error, "Invalid Transfer" }
    end
  end

  defp do_transfer(_from, _to, _amount) do
    IO.puts "Transfer done!"
  end
end

from = 123123
to = 123124
amount = 100.00

```
**Task 1:** Write a `case` statement that takes `Account.transfer_amount(from, to, amount)` as the test value. Don't forget to write the `do/end` blocks.
```elixir
case Account.transfer_amount(from, to, amount) do
end
```

**Task 2** Add `{:ok, value} as the first pattern. When there's a match, use the IO.puts function to output the string `"Transferred: $#{value}".
```elixir
case Account.transfer_amount(from, to, amount) do
  {:ok, value} -> IO.puts("Transferred: $#{value}")
end
```
**Task 3:** Add {:error, message} as the second pattern. When there's a match, use the IO.puts function to output the string "Error: #{message}".
```elixir
defmodule Account do
  def transfer_amount(from, to, amount) do
    if amount < 5000 do
      do_transfer(from, to, amount)
      { :ok, amount }
    else
      { :error, "Invalid Transfer" }
    end
  end

  defp do_transfer(_from, _to, _amount) do
    IO.puts "Transfer done!"
  end
end

from = 123123
to = 123124
amount = 100.00

case Account.transfer_amount(from, to, amount) do
  {:ok, value} -> IO.puts("Transferred: $#{value}")
  {:error, message} -> IO.puts("Error: #{message}")
end
```

#### 4.4 Adding a guard clause
Add a new pattern with the guard clause as the first entry to the case statement that returns a match for the tuple {:ok, value} and also when value is greater than 1000. When this pattern is matched, it should print "Amount transferred." to the console.
```elixir
case Account.transfer_amount(from, to, amount) do
  {:ok, value} when value > 1000 -> IO.puts "Amount transferred."
  {:ok, value} -> IO.puts "Transferred: $#{value}"
  {:error, message} -> IO.puts "Error: #{message}"
end
```
#### 4.5 Vido on the `cond` clause
Good practice to have a `true` condition hard-coded as the last line in a `cond` statement as `cond` will raise an error if none of the conditions are met. e.g. `true -> amount < 300`

`case` vs `cond`:
+ `case` for matching on multiple patterns
+ `cond` for checking multiple conditions

#### 4.6 `cond` checks
<img width="712" alt="screen shot 2017-08-19 at 15 14 46" src="https://user-images.githubusercontent.com/4185328/29487462-37134264-84f1-11e7-8eae-236bf6068978.png">

#### 4.7 The Validator
The following `validate_age` function from the Validator module returns a string based on the age passed as argument. Let’s rewrite this function to use a `cond` statement instead of nested if statements.
```elixir
defmodule Validator do
  def validate_age(age) do
    if age < 18 do
      "Under 18"
    else
      if age < 21 do
        "Under 21"
      else
        "Adult"
      end
    end
  end
end
```
Answer:
```elixir
defmodule Validator do
  def validate_age(age) do
    cond do
      age < 18 -> "Under 18"
      age < 21 -> "Under 21"
      true -> "Adult"
    end
  end
end
```
### 5.The Mix Tool
#### 5.1 Video on Running Tasks & Organizing Projects
> `.ex` files are meant to be compiled [e.g. lib files], while `.exs` files are used for scription [e.g. configuration and test files]

#### 5.2 New Project
Create a new project named expenses.

`mix new expenses`

#### 5.3 Calculating expenses

**Task 1:** Define a new function called current_balance. This function should accept two arguments: initial and spending.
```elixir
defmodule Expenses do
  def current_balance(initial, spending) do

  end
end
```
**Task 2:** From inside current_balance, return the subtraction of spending from initial.
```elixir
defmodule Expenses do
  def current_balance(initial, spending) do
    initial - spending
  end
end
```

#### Running with Mix
Using _mix_ on a single line, run a command using the -e flag by passing a string containing the Expenses.current_balance(100, 30) function and piping the return value to the IO.puts function.
```shell
> mix run -e "Expenses.current_balance(100, 30) |> IO.puts"
Compiling 1 file (.ex)
Generated expenses app
70
Success!
```

#### 5.5 File Extensions
<img width="709" alt="screen shot 2017-08-19 at 15 51 14" src="https://user-images.githubusercontent.com/4185328/29487752-57c23a74-84f6-11e7-94fd-92ce2f9677fc.png">

#### 5.6 Video on learning how to work with 3rd party dependencies

#### 5.7 Declaring dependencies
<img width="1254" alt="screen shot 2017-08-19 at 16 21 37" src="https://user-images.githubusercontent.com/4185328/29488014-8e43e4ae-84fa-11e7-8d90-d100043d1fb6.png">

```elixir
# ITC: `defp` indicates a private function, not available outside the scope of this module
defp deps do
  [{:httpoison, "~> 0.10.0"}]
end
```
**Task 2:** Now add the dependency for the :poison library with the semantic version requirement of "~> 3.0". This library parses JSON to Elixir code.
```elixir
defmodule Expenses.Mixfile do
  use Mix.Project

  def project do
    [app: :expenses,
     version: "0.1.0",
     elixir: "~> 1.4",
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     deps: deps()]
  end

  def application do
    # Specify extra applications you'll use from Erlang/Elixir
    [extra_applications: [:logger]]
  end

  defp deps do
    [{:httpoison, "~> 0.10.0"}, {:poison, "~> 3.0"}]
  end
end
```

#### 5.8 Resolving dependencies
Use the mix tool to install the dependencies from a remote repository.
`> mix deps.get`

#### 5.9 Fetching API Data

**Task 1:** Write a case statement where the test value is the return value of calling the HTTPoison.get function with the variable url as the argument.
```elixir
defmodule Expenses do
  def total_spendings_FL(amount) do
    url = "go.codeschool.com/state-taxes"
    case HTTPoison.get(url) do
    end

  end

  defp parse(_) do
    # TODO
```
**Task 2:** The first pattern to the `case` statement should be the tuple ``{:ok, response}``. When this pattern is matched, it should invoke the function `parse(response)` and then pipe its return value to the function `calculate(amount)`. We’ll define these two functions in the next challenge.
```elixir
  case HTTPoison.get(url) do
      {:ok, response} -> parse(response) |> calculate(amount)
  end
```
**Task 3:** The second pattern should be the tuple {:error, \_}. When matched, it should return the string "Error fetching tax rates".
```elixir
defmodule Expenses do
  def total_spendings_FL(amount) do
    url = "go.codeschool.com/state-taxes"
    case HTTPoison.get(url) do
      {:ok, response} -> parse(response) |> calculate(amount)
      {:error, _} -> "Error fetching tax rates"
    end

  end

  defp parse(_) do
    # TODO
  end

  defp calculate(_, _) do
    # TODO
  end
end
```
#### 5.10 Mixing data
<img width="758" alt="screen shot 2017-08-19 at 17 44 00" src="https://user-images.githubusercontent.com/4185328/29488636-d87d0fee-8506-11e7-80ec-f4788f41b542.png">

**Task 1:** Complete the parse function by adding the json_response variable to the pattern matching on the map structure in the argument.
```elixir
defp parse(%{status_code: 200, body: json_response  }) do

end
```

**Task 2:** Inside the parse function, invoke Poison.Parser.parse and pass it the json_response.
```elixir
defp parse(%{status_code: 200, body: json_response }) do
   Poison.Parser.parse(json_response)
 end
```

**Task 3:** On the first clause of the find_tax function, use the map in the argument to pattern match when "state" => "FL" and assign the value of the "rate" key to a variable named rate.
```elixir
defp find_tax([%{ "state" => "FL", "rate" => rate } | _ ]) do
    rate
end
```

**Task 4:** Inside the second clause of the find_tax function, call find_tax(tail) to complete the recursive scenario.
```elixir
defmodule Expenses do
  def total_spendings_FL(amount) do
    url = "localhost:3000/taxes"
    case HTTPoison.get(url) do
      {:ok, response} -> parse(response) |> calculate(amount)
      {:error, _} -> "Error fetching tax rates"
    end
  end

  defp parse(%{status_code: 200, body:  json_response }) do
    Poison.Parser.parse(json_response)
  end

  defp calculate({:ok, rates}, amount) do
    tax_rate = find_tax(rates)
    amount + (amount * tax_rate)
  end

  defp find_tax([%{ "state" => "FL", "rate" => rate } | _ ]) do
    rate
  end

  defp find_tax([_ | tail]) do
    find_tax(tail)
  end

  defp find_tax([]) do
    raise "FL rate not found"
  end
end
```
