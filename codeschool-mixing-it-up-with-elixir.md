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
Caught me out (CMO): the arguments have to be referred to by their number (first argument =1, second =2 and so on) and cannot be referred to in the shorthand by a name such as `number` in this case.
