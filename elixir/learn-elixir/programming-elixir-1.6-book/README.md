# Programming Elixir 1.6

#### Exercise: Pattern-Matching1, p18
The only on that doesn't match is `[a,b] = [1,2,3]`

#### Exercise: Pattern-Matching2, p19
+ `[a,b,a]=[1,2,3]` : Doesn't match because `a` cannot match both `1` _and_ `3`
+ `[a,b,a]=[1,1,2]` : Doesn't match because `a` cannot match both `1` _and_ `2`
+ `[a,b,a]=[1,2,1]` : Matches

#### Exercise: Pattern-Matching3, p20
Variable a is bound to the value `2`.
+ `[a,b,a] = [1,2,3]` : Doesn't match because `a` cannot match both `1` _and_ `3` (nothing to do with it being bound to 2 previously, if this was [1,2,1] on the right, the pattern would match successfully)
+ `[a,b,a]=[1,1,2]` : Doesn't match because `a` cannot match both `1` _and_ `2`
+ `a = 1` : Matches, because the `a` is now bound to 1 given this is a _subsequent_ match
+ `^a = 2` : Matches
+ `^a = 1` : Doesn't match. The caret implies we expect the existing value for the variable `a` (which is already bound to `2`)
+ `^a = 2 - a`: Doesn't match, the right hand side is `0` here.
