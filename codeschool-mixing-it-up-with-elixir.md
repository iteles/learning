## Mixing it up with Elixir

Trying out CodeSchool's `Mixing it up with Elixir` course, so that the practical can help with the theory.

Below I've captured the challenges as that's where the bulk of my learning lies.

### 1. Anonymous Functions

#### 1.2 Task: On the second line, invoke the anonymous function assigned to the variable and pass your own name as a string argument to it.

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
