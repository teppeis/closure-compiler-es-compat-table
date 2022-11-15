
## Optimisation

### proper tail calls (tail call optimisation)
- direct recursion ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/optimisation/proper_tail_calls__tail_call_optimisation_/direct_recursion/error.txt))
- mutual recursion ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/optimisation/proper_tail_calls__tail_call_optimisation_/mutual_recursion/error.txt))

## Syntax

### default function parameters
- basic functionality ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/default_function_parameters/basic_functionality/error.txt))
- explicit undefined defers to the default ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/default_function_parameters/explicit_undefined_defers_to_the_default/error.txt))
- defaults can refer to previous params ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/default_function_parameters/defaults_can_refer_to_previous_params/error.txt))
- arguments object interaction ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/default_function_parameters/arguments_object_interaction/error.txt))
- temporal dead zone ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/default_function_parameters/temporal_dead_zone/error.txt))
- separate scope ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/default_function_parameters/separate_scope/error.txt))

### rest parameters
- basic functionality ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/rest_parameters/basic_functionality/error.txt))
- function 'length' property ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/rest_parameters/function_length_property/error.txt))
- arguments object interaction ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/rest_parameters/arguments_object_interaction/error.txt))
- can't be used in setters ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/rest_parameters/cant_be_used_in_setters/error.txt))

### spread syntax for iterable objects
- with arrays, in function calls ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/spread_syntax_for_iterable_objects/with_arrays%2C_in_function_calls/error.txt))
- with arrays, in array literals ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/spread_syntax_for_iterable_objects/with_arrays%2C_in_array_literals/error.txt))
- with sparse arrays, in function calls ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/spread_syntax_for_iterable_objects/with_sparse_arrays%2C_in_function_calls/error.txt))
- with sparse arrays, in array literals ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/spread_syntax_for_iterable_objects/with_sparse_arrays%2C_in_array_literals/error.txt))
- with strings, in function calls ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/spread_syntax_for_iterable_objects/with_strings%2C_in_function_calls/error.txt))
- with strings, in array literals ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/spread_syntax_for_iterable_objects/with_strings%2C_in_array_literals/error.txt))
- with astral plane strings, in function calls ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/spread_syntax_for_iterable_objects/with_astral_plane_strings%2C_in_function_calls/error.txt))
- with astral plane strings, in array literals ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/spread_syntax_for_iterable_objects/with_astral_plane_strings%2C_in_array_literals/error.txt))
- with generator instances, in calls ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/spread_syntax_for_iterable_objects/with_generator_instances%2C_in_calls/error.txt))
- with generator instances, in arrays ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/spread_syntax_for_iterable_objects/with_generator_instances%2C_in_arrays/error.txt))
- with generic iterables, in calls ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/spread_syntax_for_iterable_objects/with_generic_iterables%2C_in_calls/error.txt))
- with generic iterables, in arrays ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/spread_syntax_for_iterable_objects/with_generic_iterables%2C_in_arrays/error.txt))
- with instances of iterables, in calls ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/spread_syntax_for_iterable_objects/with_instances_of_iterables%2C_in_calls/error.txt))
- with instances of iterables, in arrays ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/spread_syntax_for_iterable_objects/with_instances_of_iterables%2C_in_arrays/error.txt))
- spreading non-iterables is a runtime error ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/spread_syntax_for_iterable_objects/spreading_non-iterables_is_a_runtime_error/error.txt))

### object literal extensions
- computed properties ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/object_literal_extensions/computed_properties/error.txt))
- shorthand properties ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/object_literal_extensions/shorthand_properties/error.txt))
- shorthand methods ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/object_literal_extensions/shorthand_methods/error.txt))
- string-keyed shorthand methods ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/object_literal_extensions/string-keyed_shorthand_methods/error.txt))
- computed shorthand methods ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/object_literal_extensions/computed_shorthand_methods/error.txt))
- computed accessors ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/object_literal_extensions/computed_accessors/error.txt))

### for..of loops
- with arrays ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/for..of_loops/with_arrays/error.txt))
- with sparse arrays ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/for..of_loops/with_sparse_arrays/error.txt))
- with strings ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/for..of_loops/with_strings/error.txt))
- with astral plane strings ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/for..of_loops/with_astral_plane_strings/error.txt))
- with generator instances ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/for..of_loops/with_generator_instances/error.txt))
- with generic iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/for..of_loops/with_generic_iterables/error.txt))
- with instances of generic iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/for..of_loops/with_instances_of_generic_iterables/error.txt))
- iterator closing, break ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/for..of_loops/iterator_closing%2C_break/error.txt)): https://github.com/google/closure-compiler/issues/2958
- iterator closing, throw ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/for..of_loops/iterator_closing%2C_throw/error.txt)): https://github.com/google/closure-compiler/issues/2958

### octal and binary literals
- octal literals ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/octal_and_binary_literals/octal_literals/error.txt))
- binary literals ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/octal_and_binary_literals/binary_literals/error.txt))
- octal supported by Number() ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/octal_and_binary_literals/octal_supported_by_Number__/error.txt))
- binary supported by Number() ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/octal_and_binary_literals/binary_supported_by_Number__/error.txt))

### template literals
- basic functionality ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/template_literals/basic_functionality/error.txt))
- toString conversion ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/template_literals/toString_conversion/error.txt))
- tagged template literals ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/template_literals/tagged_template_literals/error.txt))
- passed array is frozen ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/template_literals/passed_array_is_frozen/error.txt))
- line break normalisation ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/template_literals/line_break_normalisation/error.txt))
- TemplateStrings call site caching ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/template_literals/TemplateStrings_call_site_caching/error.txt))
- TemplateStrings permanent caching ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/template_literals/TemplateStrings_permanent_caching/error.txt))

### RegExp "y" and "u" flags
- "y" flag ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/RegExp_y_and_u_flags/y_flag/error.txt))
- "y" flag, lastIndex ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/RegExp_y_and_u_flags/y_flag%2C_lastIndex/error.txt))
- "u" flag ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/RegExp_y_and_u_flags/u_flag/error.txt))
- "u" flag, non-BMP Unicode characters ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/RegExp_y_and_u_flags/u_flag%2C_non-BMP_Unicode_characters/error.txt))
- "u" flag, Unicode code point escapes ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/RegExp_y_and_u_flags/u_flag%2C_Unicode_code_point_escapes/error.txt))
- "u" flag, case folding ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/RegExp_y_and_u_flags/u_flag%2C_case_folding/error.txt))

### destructuring, declarations
- with arrays ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/with_arrays/error.txt))
- with sparse arrays ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/with_sparse_arrays/error.txt))
- with strings ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/with_strings/error.txt))
- with astral plane strings ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/with_astral_plane_strings/error.txt))
- with generator instances ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/with_generator_instances/error.txt))
- with generic iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/with_generic_iterables/error.txt))
- with instances of generic iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/with_instances_of_generic_iterables/error.txt))
- iterator closing ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/iterator_closing/error.txt)): https://github.com/google/closure-compiler/issues/2958
- trailing commas in iterable patterns ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/trailing_commas_in_iterable_patterns/error.txt))
- with objects ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/with_objects/error.txt))
- object destructuring with primitives ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/object_destructuring_with_primitives/error.txt))
- trailing commas in object patterns ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/trailing_commas_in_object_patterns/error.txt))
- throws on null and undefined ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/throws_on_null_and_undefined/error.txt))
- computed properties ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/computed_properties/error.txt))
- multiples in a single var statement ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/multiples_in_a_single_var_statement/error.txt))
- nested ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/nested/error.txt))
- in for-in loop heads ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/in_for-in_loop_heads/error.txt))
- in for-of loop heads ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/in_for-of_loop_heads/error.txt))
- in catch heads ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/in_catch_heads/error.txt))
- rest ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/rest/error.txt))
- defaults ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/defaults/error.txt))
- defaults, let temporal dead zone ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_declarations/defaults%2C_let_temporal_dead_zone/error.txt))

### destructuring, assignment
- with arrays ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/with_arrays/error.txt))
- with sparse arrays ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/with_sparse_arrays/error.txt))
- with strings ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/with_strings/error.txt))
- with astral plane strings ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/with_astral_plane_strings/error.txt))
- with generator instances ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/with_generator_instances/error.txt))
- with generic iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/with_generic_iterables/error.txt))
- with instances of generic iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/with_instances_of_generic_iterables/error.txt))
- iterator closing ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/iterator_closing/error.txt)): https://github.com/google/closure-compiler/issues/2958
- iterable destructuring expression ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/iterable_destructuring_expression/error.txt))
- chained iterable destructuring ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/chained_iterable_destructuring/error.txt))
- trailing commas in iterable patterns ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/trailing_commas_in_iterable_patterns/error.txt))
- with objects ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/with_objects/error.txt))
- object destructuring with primitives ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/object_destructuring_with_primitives/error.txt))
- trailing commas in object patterns ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/trailing_commas_in_object_patterns/error.txt))
- object destructuring expression ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/object_destructuring_expression/error.txt))
- parenthesised left-hand-side is a syntax error ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/parenthesised_left-hand-side_is_a_syntax_error/error.txt))
- chained object destructuring ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/chained_object_destructuring/error.txt))
- throws on null and undefined ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/throws_on_null_and_undefined/error.txt))
- computed properties ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/computed_properties/error.txt))
- nested ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/nested/error.txt))
- rest ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/rest/error.txt))
- nested rest ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/nested_rest/error.txt))
- empty patterns ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/empty_patterns/error.txt))
- defaults ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_assignment/defaults/error.txt))

### destructuring, parameters
- with arrays ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/with_arrays/error.txt))
- with sparse arrays ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/with_sparse_arrays/error.txt))
- with strings ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/with_strings/error.txt))
- with astral plane strings ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/with_astral_plane_strings/error.txt))
- with generator instances ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/with_generator_instances/error.txt))
- with generic iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/with_generic_iterables/error.txt))
- with instances of generic iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/with_instances_of_generic_iterables/error.txt))
- iterator closing ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/iterator_closing/error.txt)): https://github.com/google/closure-compiler/issues/2958
- trailing commas in iterable patterns ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/trailing_commas_in_iterable_patterns/error.txt))
- with objects ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/with_objects/error.txt))
- object destructuring with primitives ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/object_destructuring_with_primitives/error.txt))
- trailing commas in object patterns ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/trailing_commas_in_object_patterns/error.txt))
- throws on null and undefined ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/throws_on_null_and_undefined/error.txt))
- computed properties ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/computed_properties/error.txt))
- nested ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/nested/error.txt))
- 'arguments' interaction ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/arguments_interaction/error.txt))
- in parameters, function 'length' property ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/in_parameters%2C_function_length_property/error.txt))
- rest ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/rest/error.txt))
- empty patterns ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/empty_patterns/error.txt))
- defaults ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/defaults/error.txt))
- defaults, separate scope ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/defaults%2C_separate_scope/error.txt))
- aliased defaults, arrow function ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/aliased_defaults%2C_arrow_function/error.txt))
- shorthand defaults, arrow function ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/shorthand_defaults%2C_arrow_function/error.txt))
- duplicate identifier ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/destructuring%2C_parameters/duplicate_identifier/error.txt))

### Unicode code point escapes
- in strings ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/Unicode_code_point_escapes/in_strings/error.txt))
- in identifiers ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/Unicode_code_point_escapes/in_identifiers/error.txt))
- in property key definitions ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/Unicode_code_point_escapes/in_property_key_definitions/error.txt))
- in property key accesses ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/Unicode_code_point_escapes/in_property_key_accesses/error.txt))

### new.target
- in constructors ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/new.target/in_constructors/error.txt))
- assignment is an early error ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/syntax/new.target/assignment_is_an_early_error/error.txt))

## Bindings

### const
- basic support ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/basic_support/error.txt))
- is block-scoped ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/is_block-scoped/error.txt))
- scope shadow resolution ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/scope_shadow_resolution/error.txt))
- cannot be in statements ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/cannot_be_in_statements/error.txt))
- redefining a const is an error ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/redefining_a_const_is_an_error/error.txt))
- for loop statement scope ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/for_loop_statement_scope/error.txt))
- for-in loop iteration scope ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/for-in_loop_iteration_scope/error.txt))
- for-of loop iteration scope ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/for-of_loop_iteration_scope/error.txt))
- temporal dead zone ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/temporal_dead_zone/error.txt))
- basic support (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/basic_support__strict_mode_/error.txt))
- is block-scoped (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/is_block-scoped__strict_mode_/error.txt))
- scope shadow resolution (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/scope_shadow_resolution__strict_mode_/error.txt))
- cannot be in statements (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/cannot_be_in_statements__strict_mode_/error.txt))
- redefining a const (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/redefining_a_const__strict_mode_/error.txt))
- for loop statement scope (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/for_loop_statement_scope__strict_mode_/error.txt))
- for-in loop iteration scope (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/for-in_loop_iteration_scope__strict_mode_/error.txt))
- for-of loop iteration scope (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/for-of_loop_iteration_scope__strict_mode_/error.txt))
- temporal dead zone (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/const/temporal_dead_zone__strict_mode_/error.txt))

### let
- basic support ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/basic_support/error.txt))
- is block-scoped ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/is_block-scoped/error.txt))
- scope shadow resolution ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/scope_shadow_resolution/error.txt))
- cannot be in statements ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/cannot_be_in_statements/error.txt))
- for loop statement scope ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/for_loop_statement_scope/error.txt))
- temporal dead zone ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/temporal_dead_zone/error.txt))
- for/for-in loop iteration scope ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/for_for-in_loop_iteration_scope/error.txt))
- for-in loop binding shadowing parameter ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/for-in_loop_binding_shadowing_parameter/error.txt))
- basic support (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/basic_support__strict_mode_/error.txt))
- is block-scoped (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/is_block-scoped__strict_mode_/error.txt))
- scope shadow resolution (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/scope_shadow_resolution__strict_mode_/error.txt))
- cannot be in statements (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/cannot_be_in_statements__strict_mode_/error.txt))
- for loop statement scope (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/for_loop_statement_scope__strict_mode_/error.txt))
- temporal dead zone (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/temporal_dead_zone__strict_mode_/error.txt))
- for/for-in loop iteration scope (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/for_for-in_loop_iteration_scope__strict_mode_/error.txt))
- for-in loop binding shadowing parameter (strict mode) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/let/for-in_loop_binding_shadowing_parameter__strict_mode_/error.txt))

### block-level function declaration
- block-level function declaration ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/bindings/block-level_function_declaration/error.txt))

## Functions

### arrow functions
- 0 parameters ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/arrow_functions/0_parameters/error.txt))
- 1 parameter, no brackets ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/arrow_functions/1_parameter%2C_no_brackets/error.txt))
- multiple parameters ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/arrow_functions/multiple_parameters/error.txt))
- lexical "this" binding ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/arrow_functions/lexical_this_binding/error.txt))
- "this" unchanged by call or apply ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/arrow_functions/this_unchanged_by_call_or_apply/error.txt))
- can't be bound, can be curried ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/arrow_functions/cant_be_bound%2C_can_be_curried/error.txt))
- lexical "arguments" binding ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/arrow_functions/lexical_arguments_binding/error.txt))
- no line break between params and <code>=></code> ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/arrow_functions/no_line_break_between_params_and_arrow/error.txt))
- correct precedence ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/arrow_functions/correct_precedence/error.txt))
- no "prototype" property ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/arrow_functions/no_prototype_property/error.txt))
- lexical "super" binding in constructors ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/arrow_functions/lexical_super_binding_in_constructors/error.txt))
- lexical "super" binding in methods ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/arrow_functions/lexical_super_binding_in_methods/error.txt))
- lexical "new.target" binding ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/arrow_functions/lexical_new.target_binding/error.txt))

### class
- class statement ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/class_statement/error.txt))
- is block-scoped ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/is_block-scoped/error.txt))
- class expression ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/class_expression/error.txt))
- anonymous class ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/anonymous_class/error.txt))
- constructor ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/constructor/error.txt))
- prototype methods ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/prototype_methods/error.txt))
- string-keyed methods ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/string-keyed_methods/error.txt))
- computed prototype methods ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/computed_prototype_methods/error.txt))
- optional semicolons ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/optional_semicolons/error.txt))
- static methods ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/static_methods/error.txt))
- computed static methods ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/computed_static_methods/error.txt))
- accessor properties ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/accessor_properties/error.txt))
- computed accessor properties ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/computed_accessor_properties/error.txt))
- static accessor properties ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/static_accessor_properties/error.txt))
- computed static accessor properties ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/computed_static_accessor_properties/error.txt))
- class name is lexically scoped ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/class_name_is_lexically_scoped/error.txt))
- computed names, temporal dead zone ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/computed_names%2C_temporal_dead_zone/error.txt))
- methods aren't enumerable ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/methods_arent_enumerable/error.txt))
- implicit strict mode ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/implicit_strict_mode/error.txt))
- constructor requires new ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/constructor_requires_new/error.txt)): https://github.com/google/closure-compiler/issues/2919
- extends ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/extends/error.txt))
- extends expressions ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/extends_expressions/error.txt))
- extends null ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/extends_null/error.txt))
- new.target ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/class/new.target/error.txt))

### super
- statement in constructors ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/super/statement_in_constructors/error.txt))
- expression in constructors ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/super/expression_in_constructors/error.txt))
- in methods, property access ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/super/in_methods%2C_property_access/error.txt))
- in methods, method calls ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/super/in_methods%2C_method_calls/error.txt))
- method calls use correct "this" binding ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/super/method_calls_use_correct_this_binding/error.txt))
- constructor calls use correct "new.target" binding ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/super/constructor_calls_use_correct_new.target_binding/error.txt))
- is statically bound ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/super/is_statically_bound/error.txt))
- super() invokes the correct constructor ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/super/super___invokes_the_correct_constructor/error.txt))

### generators
- basic functionality ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/basic_functionality/error.txt))
- generator function expressions ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/generator_function_expressions/error.txt))
- correct "this" binding ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/correct_this_binding/error.txt))
- can't use "this" with new ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/cant_use_this_with_new/error.txt))
- sending ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/sending/error.txt))
- %GeneratorPrototype% ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/%25GeneratorPrototype%25/error.txt))
- %GeneratorPrototype% prototype chain ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/%25GeneratorPrototype%25_prototype_chain/error.txt))
- %GeneratorPrototype%.constructor ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/%25GeneratorPrototype%25.constructor/error.txt))
- %GeneratorPrototype%.throw ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/%25GeneratorPrototype%25.throw/error.txt))
- %GeneratorPrototype%.return ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/%25GeneratorPrototype%25.return/error.txt))
- yield operator precedence ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/yield_operator_precedence/error.txt))
- yield *, arrays ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/yield__%2C_arrays/error.txt))
- yield *, sparse arrays ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/yield__%2C_sparse_arrays/error.txt))
- yield *, strings ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/yield__%2C_strings/error.txt))
- yield *, astral plane strings ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/yield__%2C_astral_plane_strings/error.txt))
- yield *, generator instances ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/yield__%2C_generator_instances/error.txt))
- yield *, generic iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/yield__%2C_generic_iterables/error.txt))
- yield *, instances of iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/yield__%2C_instances_of_iterables/error.txt))
- yield * on non-iterables is a runtime error ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/yield___on_non-iterables_is_a_runtime_error/error.txt))
- yield *, iterator closing ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/yield__%2C_iterator_closing/error.txt))
- yield *, iterator closing via throw() ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/yield__%2C_iterator_closing_via_throw__/error.txt))
- shorthand generator methods ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/shorthand_generator_methods/error.txt))
- string-keyed shorthand generator methods ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/string-keyed_shorthand_generator_methods/error.txt))
- computed shorthand generators ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/computed_shorthand_generators/error.txt))
- shorthand generator methods, classes ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/shorthand_generator_methods%2C_classes/error.txt))
- computed shorthand generators, classes ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/computed_shorthand_generators%2C_classes/error.txt))
- shorthand generators can't be constructors ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/functions/generators/shorthand_generators_cant_be_constructors/error.txt))

## Built ins

### Map
- basic functionality ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/basic_functionality/error.txt))
- constructor arguments ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/constructor_arguments/error.txt))
- constructor requires new ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/constructor_requires_new/error.txt)): https://github.com/google/closure-compiler/issues/2919
- constructor accepts null ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/constructor_accepts_null/error.txt))
- constructor invokes set ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/constructor_invokes_set/error.txt))
- iterator closing ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/iterator_closing/error.txt)): https://github.com/google/closure-compiler/issues/2958
- Map.prototype.set returns this ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/Map.prototype.set_returns_this/error.txt))
- -0 key converts to +0 ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/-0_key_converts_to_%2B0/error.txt))
- Map.prototype.size ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/Map.prototype.size/error.txt))
- Map.prototype.delete ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/Map.prototype.delete/error.txt))
- Map.prototype.clear ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/Map.prototype.clear/error.txt))
- Map.prototype.forEach ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/Map.prototype.forEach/error.txt))
- Map.prototype.keys ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/Map.prototype.keys/error.txt))
- Map.prototype.values ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/Map.prototype.values/error.txt))
- Map.prototype.entries ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/Map.prototype.entries/error.txt))
- Map.prototype[Symbol.iterator] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/Map.prototype_Symbol.iterator_/error.txt))
- Map.prototype isn't an instance ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/Map.prototype_isnt_an_instance/error.txt))
- Map iterator prototype chain ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/Map_iterator_prototype_chain/error.txt))
- Map[Symbol.species] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Map/Map_Symbol.species_/error.txt))

### Set
- basic functionality ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/basic_functionality/error.txt))
- constructor arguments ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/constructor_arguments/error.txt))
- constructor requires new ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/constructor_requires_new/error.txt)): https://github.com/google/closure-compiler/issues/2919
- constructor accepts null ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/constructor_accepts_null/error.txt))
- constructor invokes add ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/constructor_invokes_add/error.txt))
- iterator closing ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/iterator_closing/error.txt)): https://github.com/google/closure-compiler/issues/2958
- Set.prototype.add returns this ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/Set.prototype.add_returns_this/error.txt))
- -0 key converts to +0 ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/-0_key_converts_to_%2B0/error.txt))
- Set.prototype.size ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/Set.prototype.size/error.txt))
- Set.prototype.delete ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/Set.prototype.delete/error.txt))
- Set.prototype.clear ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/Set.prototype.clear/error.txt))
- Set.prototype.forEach ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/Set.prototype.forEach/error.txt))
- Set.prototype.keys ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/Set.prototype.keys/error.txt))
- Set.prototype.values ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/Set.prototype.values/error.txt))
- Set.prototype.entries ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/Set.prototype.entries/error.txt))
- Set.prototype[Symbol.iterator] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/Set.prototype_Symbol.iterator_/error.txt))
- Set.prototype isn't an instance ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/Set.prototype_isnt_an_instance/error.txt))
- Set iterator prototype chain ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/Set_iterator_prototype_chain/error.txt))
- Set[Symbol.species] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Set/Set_Symbol.species_/error.txt))

### WeakMap
- basic functionality ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakMap/basic_functionality/error.txt))
- constructor arguments ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakMap/constructor_arguments/error.txt))
- constructor requires new ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakMap/constructor_requires_new/error.txt)): https://github.com/google/closure-compiler/issues/2919
- constructor accepts null ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakMap/constructor_accepts_null/error.txt))
- constructor invokes set ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakMap/constructor_invokes_set/error.txt))
- frozen objects as keys ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakMap/frozen_objects_as_keys/error.txt))
- iterator closing ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakMap/iterator_closing/error.txt)): https://github.com/google/closure-compiler/issues/2958
- WeakMap.prototype.set returns this ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakMap/WeakMap.prototype.set_returns_this/error.txt))
- WeakMap.prototype.delete ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakMap/WeakMap.prototype.delete/error.txt))
- no WeakMap.prototype.clear method ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakMap/no_WeakMap.prototype.clear_method/error.txt))
- .has, .get and .delete methods accept primitives ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakMap/.has%2C_.get_and_.delete_methods_accept_primitives/error.txt))
- WeakMap.prototype isn't an instance ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakMap/WeakMap.prototype_isnt_an_instance/error.txt))

### WeakSet
- basic functionality ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakSet/basic_functionality/error.txt))
- constructor arguments ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakSet/constructor_arguments/error.txt))
- constructor requires new ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakSet/constructor_requires_new/error.txt)): https://github.com/google/closure-compiler/issues/2919
- constructor accepts null ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakSet/constructor_accepts_null/error.txt))
- constructor invokes add ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakSet/constructor_invokes_add/error.txt))
- iterator closing ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakSet/iterator_closing/error.txt)): https://github.com/google/closure-compiler/issues/2958
- WeakSet.prototype.add returns this ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakSet/WeakSet.prototype.add_returns_this/error.txt))
- WeakSet.prototype.delete ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakSet/WeakSet.prototype.delete/error.txt))
- no WeakSet.prototype.clear method ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakSet/no_WeakSet.prototype.clear_method/error.txt))
- .has and .delete methods accept primitives ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakSet/.has_and_.delete_methods_accept_primitives/error.txt))
- WeakSet.prototype isn't an instance ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/WeakSet/WeakSet.prototype_isnt_an_instance/error.txt))

### Reflect
- Reflect.get ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.get/error.txt))
- Reflect.set ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.set/error.txt))
- Reflect.has ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.has/error.txt))
- Reflect.deleteProperty ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.deleteProperty/error.txt))
- Reflect.getOwnPropertyDescriptor ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.getOwnPropertyDescriptor/error.txt))
- Reflect.defineProperty ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.defineProperty/error.txt))
- Reflect.getPrototypeOf ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.getPrototypeOf/error.txt))
- Reflect.setPrototypeOf ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.setPrototypeOf/error.txt))
- Reflect.isExtensible ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.isExtensible/error.txt))
- Reflect.preventExtensions ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.preventExtensions/error.txt))
- Reflect.ownKeys, string keys ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.ownKeys%2C_string_keys/error.txt))
- Reflect.ownKeys, symbol keys ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.ownKeys%2C_symbol_keys/error.txt))
- Reflect.apply ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.apply/error.txt))
- Reflect.construct ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.construct/error.txt))
- Reflect.construct sets new.target meta-property ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.construct_sets_new.target_meta-property/error.txt))
- Reflect.construct creates instances from third argument ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.construct_creates_instances_from_third_argument/error.txt))
- Reflect.construct, Promise subclassing ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Reflect/Reflect.construct%2C_Promise_subclassing/error.txt))

### Promise
- basic functionality ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Promise/basic_functionality/error.txt))
- constructor requires new ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Promise/constructor_requires_new/error.txt)): https://github.com/google/closure-compiler/issues/2919
- Promise.prototype isn't an instance ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Promise/Promise.prototype_isnt_an_instance/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Promise/Promise.prototype_isnt_an_instance/out.js))
- Promise.all ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Promise/Promise.all/error.txt))
- Promise.all, generic iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Promise/Promise.all%2C_generic_iterables/error.txt))
- Promise.race ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Promise/Promise.race/error.txt))
- Promise.race, generic iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Promise/Promise.race%2C_generic_iterables/error.txt))
- Promise[Symbol.species] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Promise/Promise_Symbol.species_/error.txt))

### Symbol
- basic functionality ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Symbol/basic_functionality/error.txt))
- typeof support ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Symbol/typeof_support/error.txt))
- symbol keys are hidden to pre-ES6 code ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Symbol/symbol_keys_are_hidden_to_pre-ES6_code/error.txt))
- Object.defineProperty support ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Symbol/Object.defineProperty_support/error.txt))
- symbols inherit from Symbol.prototype ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Symbol/symbols_inherit_from_Symbol.prototype/error.txt))
- cannot coerce to string or number ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Symbol/cannot_coerce_to_string_or_number/error.txt))
- can convert with String() ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Symbol/can_convert_with_String__/error.txt))
- new Symbol() throws ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Symbol/new_Symbol___throws/error.txt))
- Object(symbol) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Symbol/Object_symbol_/error.txt))
- JSON.stringify ignores symbol primitives ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Symbol/JSON.stringify_ignores_symbol_primitives/error.txt))
- JSON.stringify ignores symbol objects ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Symbol/JSON.stringify_ignores_symbol_objects/error.txt))
- global symbol registry ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/Symbol/global_symbol_registry/error.txt))

### well-known symbols
- Symbol.hasInstance ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.hasInstance/error.txt))
- Symbol.isConcatSpreadable, non-spreadable array ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.isConcatSpreadable%2C_non-spreadable_array/error.txt))
- Symbol.isConcatSpreadable, spreadable object with poisoned getter ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.isConcatSpreadable%2C_spreadable_object_with_poisoned_getter/error.txt))
- Symbol.iterator, existence ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.iterator%2C_existence/error.txt))
- Symbol.iterator, arguments object ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.iterator%2C_arguments_object/error.txt))
- Symbol.species, existence ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.species%2C_existence/error.txt))
- Symbol.species, Array.prototype.concat ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.species%2C_Array.prototype.concat/error.txt))
- Symbol.species, Array.prototype.filter ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.species%2C_Array.prototype.filter/error.txt))
- Symbol.species, Array.prototype.map ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.species%2C_Array.prototype.map/error.txt))
- Symbol.species, Array.prototype.slice ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.species%2C_Array.prototype.slice/error.txt))
- Symbol.species, Array.prototype.splice ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.species%2C_Array.prototype.splice/error.txt))
- Symbol.species, RegExp.prototype[Symbol.split] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.species%2C_RegExp.prototype_Symbol.split_/error.txt))
- Symbol.species, Promise.prototype.then ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.species%2C_Promise.prototype.then/error.txt))
- Symbol.replace ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.replace/error.txt))
- Symbol.search ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.search/error.txt))
- Symbol.split ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.split/error.txt))
- Symbol.match ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.match/error.txt))
- Symbol.match, RegExp constructor ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.match%2C_RegExp_constructor/error.txt))
- Symbol.match, String.prototype.startsWith ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.match%2C_String.prototype.startsWith/error.txt))
- Symbol.match, String.prototype.endsWith ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.match%2C_String.prototype.endsWith/error.txt))
- Symbol.match, String.prototype.includes ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.match%2C_String.prototype.includes/error.txt))
- Symbol.toPrimitive ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.toPrimitive/error.txt))
- Symbol.toStringTag ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.toStringTag/error.txt))
- Symbol.toStringTag affects existing built-ins ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.toStringTag_affects_existing_built-ins/error.txt))
- Symbol.toStringTag, new built-ins ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.toStringTag%2C_new_built-ins/error.txt))
- Symbol.toStringTag, misc. built-ins ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.toStringTag%2C_misc._built-ins/error.txt))
- Symbol.unscopables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-ins/well-known_symbols/Symbol.unscopables/error.txt))

## Built in extensions

### Object static methods
- Object.assign ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Object_static_methods/Object.assign/error.txt))
- Object.is ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Object_static_methods/Object.is/error.txt))
- Object.getOwnPropertySymbols ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Object_static_methods/Object.getOwnPropertySymbols/error.txt))
- Object.setPrototypeOf ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Object_static_methods/Object.setPrototypeOf/error.txt))

### function "name" property
- function statements ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/function_statements/error.txt))
- function expressions ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/function_expressions/error.txt))
- new Function ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/new_Function/error.txt))
- bound functions ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/bound_functions/error.txt))
- variables (function) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/variables__function_/error.txt))
- object methods (function) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/object_methods__function_/error.txt))
- accessor properties ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/accessor_properties/error.txt))
- shorthand methods ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/shorthand_methods/error.txt))
- shorthand methods (no lexical binding) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/shorthand_methods__no_lexical_binding_/error.txt))
- symbol-keyed methods ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/symbol-keyed_methods/error.txt))
- class statements ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/class_statements/error.txt))
- class expressions ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/class_expressions/error.txt))
- variables (class) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/variables__class_/error.txt))
- object methods (class) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/object_methods__class_/error.txt))
- class prototype methods ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/class_prototype_methods/error.txt))
- class static methods ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/class_static_methods/error.txt))
- isn't writable, is configurable ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/function_name_property/isnt_writable%2C_is_configurable/error.txt))

### String static methods
- String.raw ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/String_static_methods/String.raw/error.txt)): https://github.com/google/closure-compiler/issues/3136
- String.fromCodePoint ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/String_static_methods/String.fromCodePoint/error.txt))

### String.prototype methods
- String.prototype.codePointAt ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/String.prototype_methods/String.prototype.codePointAt/error.txt))
- String.prototype.normalize ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/String.prototype_methods/String.prototype.normalize/error.txt))
- String.prototype.repeat ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/String.prototype_methods/String.prototype.repeat/error.txt))
- String.prototype.startsWith ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/String.prototype_methods/String.prototype.startsWith/error.txt))
- String.prototype.startsWith throws on RegExp ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/String.prototype_methods/String.prototype.startsWith_throws_on_RegExp/error.txt))
- String.prototype.endsWith ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/String.prototype_methods/String.prototype.endsWith/error.txt))
- String.prototype.endsWith throws on RegExp ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/String.prototype_methods/String.prototype.endsWith_throws_on_RegExp/error.txt))
- String.prototype.includes ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/String.prototype_methods/String.prototype.includes/error.txt))
- String.prototype[Symbol.iterator] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/String.prototype_methods/String.prototype_Symbol.iterator_/error.txt))
- String iterator prototype chain ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/String.prototype_methods/String_iterator_prototype_chain/error.txt))

### RegExp.prototype properties
- RegExp.prototype.flags ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/RegExp.prototype_properties/RegExp.prototype.flags/error.txt))
- RegExp.prototype[Symbol.match] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/RegExp.prototype_properties/RegExp.prototype_Symbol.match_/error.txt))
- RegExp.prototype[Symbol.replace] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/RegExp.prototype_properties/RegExp.prototype_Symbol.replace_/error.txt))
- RegExp.prototype[Symbol.split] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/RegExp.prototype_properties/RegExp.prototype_Symbol.split_/error.txt))
- RegExp.prototype[Symbol.search] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/RegExp.prototype_properties/RegExp.prototype_Symbol.search_/error.txt))
- RegExp[Symbol.species] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/RegExp.prototype_properties/RegExp_Symbol.species_/error.txt))

### Array static methods
- Array.from, array-like objects ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array_static_methods/Array.from%2C_array-like_objects/error.txt))
- Array.from, generator instances ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array_static_methods/Array.from%2C_generator_instances/error.txt))
- Array.from, generic iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array_static_methods/Array.from%2C_generic_iterables/error.txt))
- Array.from, instances of generic iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array_static_methods/Array.from%2C_instances_of_generic_iterables/error.txt))
- Array.from map function, array-like objects ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array_static_methods/Array.from_map_function%2C_array-like_objects/error.txt))
- Array.from map function, generator instances ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array_static_methods/Array.from_map_function%2C_generator_instances/error.txt))
- Array.from map function, generic iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array_static_methods/Array.from_map_function%2C_generic_iterables/error.txt))
- Array.from map function, instances of iterables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array_static_methods/Array.from_map_function%2C_instances_of_iterables/error.txt))
- Array.from, iterator closing ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array_static_methods/Array.from%2C_iterator_closing/error.txt))
- Array.of ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array_static_methods/Array.of/error.txt))
- Array[Symbol.species] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array_static_methods/Array_Symbol.species_/error.txt))

### Array.prototype methods
- Array.prototype.copyWithin ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array.prototype_methods/Array.prototype.copyWithin/error.txt))
- Array.prototype.find ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array.prototype_methods/Array.prototype.find/error.txt))
- Array.prototype.findIndex ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array.prototype_methods/Array.prototype.findIndex/error.txt))
- Array.prototype.fill ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array.prototype_methods/Array.prototype.fill/error.txt))
- Array.prototype.keys ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array.prototype_methods/Array.prototype.keys/error.txt))
- Array.prototype.values ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array.prototype_methods/Array.prototype.values/error.txt))
- Array.prototype.entries ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array.prototype_methods/Array.prototype.entries/error.txt))
- Array.prototype.splice ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array.prototype_methods/Array.prototype.splice/error.txt))
- Array.prototype[Symbol.iterator] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array.prototype_methods/Array.prototype_Symbol.iterator_/error.txt))
- Array iterator prototype chain ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array.prototype_methods/Array_iterator_prototype_chain/error.txt))
- Array.prototype[Symbol.unscopables] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Array.prototype_methods/Array.prototype_Symbol.unscopables_/error.txt))

### Number properties
- Number.isFinite ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Number_properties/Number.isFinite/error.txt))
- Number.isInteger ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Number_properties/Number.isInteger/error.txt))
- Number.isSafeInteger ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Number_properties/Number.isSafeInteger/error.txt))
- Number.isNaN ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Number_properties/Number.isNaN/error.txt))
- Number.parseFloat ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Number_properties/Number.parseFloat/error.txt))
- Number.parseInt ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Number_properties/Number.parseInt/error.txt))
- Number.EPSILON ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Number_properties/Number.EPSILON/error.txt))
- Number.MIN_SAFE_INTEGER ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Number_properties/Number.MIN_SAFE_INTEGER/error.txt))
- Number.MAX_SAFE_INTEGER ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Number_properties/Number.MAX_SAFE_INTEGER/error.txt))

### Math methods
- Math.clz32 ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.clz32/error.txt))
- Math.imul ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.imul/error.txt))
- Math.sign ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.sign/error.txt))
- Math.log10 ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.log10/error.txt))
- Math.log2 ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.log2/error.txt))
- Math.log1p ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.log1p/error.txt))
- Math.expm1 ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.expm1/error.txt))
- Math.cosh ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.cosh/error.txt))
- Math.sinh ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.sinh/error.txt))
- Math.tanh ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.tanh/error.txt))
- Math.acosh ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.acosh/error.txt))
- Math.asinh ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.asinh/error.txt))
- Math.atanh ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.atanh/error.txt))
- Math.trunc ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.trunc/error.txt))
- Math.fround ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.fround/error.txt))
- Math.cbrt ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.cbrt/error.txt))
- Math.hypot ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Math_methods/Math.hypot/error.txt))

### Date.prototype[Symbol.toPrimitive]
- Date.prototype[Symbol.toPrimitive] ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/built-in_extensions/Date.prototype_Symbol.toPrimitive_/error.txt))

## Misc

### prototype of bound functions
- basic functions ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/prototype_of_bound_functions/basic_functions/error.txt))
- generator functions ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/prototype_of_bound_functions/generator_functions/error.txt))
- arrow functions ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/prototype_of_bound_functions/arrow_functions/error.txt))
- classes ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/prototype_of_bound_functions/classes/error.txt))
- subclasses ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/prototype_of_bound_functions/subclasses/error.txt))

### Object static methods accept primitives
- Object.getPrototypeOf ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/Object_static_methods_accept_primitives/Object.getPrototypeOf/error.txt))
- Object.getOwnPropertyDescriptor ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/Object_static_methods_accept_primitives/Object.getOwnPropertyDescriptor/error.txt))
- Object.getOwnPropertyNames ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/Object_static_methods_accept_primitives/Object.getOwnPropertyNames/error.txt))
- Object.seal ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/Object_static_methods_accept_primitives/Object.seal/error.txt))
- Object.freeze ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/Object_static_methods_accept_primitives/Object.freeze/error.txt))
- Object.preventExtensions ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/Object_static_methods_accept_primitives/Object.preventExtensions/error.txt))
- Object.isSealed ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/Object_static_methods_accept_primitives/Object.isSealed/error.txt))
- Object.isFrozen ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/Object_static_methods_accept_primitives/Object.isFrozen/error.txt))
- Object.isExtensible ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/Object_static_methods_accept_primitives/Object.isExtensible/error.txt))
- Object.keys ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/Object_static_methods_accept_primitives/Object.keys/error.txt))

### own property order
- Object.keys ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/own_property_order/Object.keys/error.txt))
- Object.getOwnPropertyNames ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/own_property_order/Object.getOwnPropertyNames/error.txt))
- Object.assign ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/own_property_order/Object.assign/error.txt))
- JSON.stringify ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/own_property_order/JSON.stringify/error.txt))
- JSON.parse ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/own_property_order/JSON.parse/error.txt))
- Reflect.ownKeys, string key order ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/own_property_order/Reflect.ownKeys%2C_string_key_order/error.txt))
- Reflect.ownKeys, symbol key order ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/own_property_order/Reflect.ownKeys%2C_symbol_key_order/error.txt))

### Updated identifier syntax
- var ⸯ; ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/Updated_identifier_syntax/var_U%2B2E2F_/error.txt))
- var 𐋀; ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/Updated_identifier_syntax/var_U%2B102C0_/error.txt))
- no escaped reserved words as identifiers ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/Updated_identifier_syntax/no_escaped_reserved_words_as_identifiers/error.txt))

### miscellaneous
- duplicate property names in strict mode ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/miscellaneous/duplicate_property_names_in_strict_mode/error.txt))
- no semicolon needed after do-while ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/miscellaneous/no_semicolon_needed_after_do-while/error.txt))
- no assignments allowed in for-in head in strict mode ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/miscellaneous/no_assignments_allowed_in_for-in_head_in_strict_mode/error.txt))
- accessors aren't constructors ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/miscellaneous/accessors_arent_constructors/error.txt))
- Invalid Date ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/miscellaneous/Invalid_Date/error.txt))
- RegExp constructor can alter flags ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/miscellaneous/RegExp_constructor_can_alter_flags/error.txt))
- RegExp.prototype.toString generic and uses "flags" property ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/miscellaneous/RegExp.prototype.toString_generic_and_uses_flags_property/error.txt))
- built-in prototypes are not instances ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/miscellaneous/built-in_prototypes_are_not_instances/error.txt))
- function 'length' is configurable ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/misc/miscellaneous/function_length_is_configurable/error.txt))

## Annex b

### non-strict function semantics
- hoisted block-level function declaration ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/non-strict_function_semantics/hoisted_block-level_function_declaration/error.txt))
- labeled function statements ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/non-strict_function_semantics/labeled_function_statements/error.txt))
- function statements in if-statement clauses ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/non-strict_function_semantics/function_statements_in_if-statement_clauses/error.txt))

### __proto__ in object literals
- basic support ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/__proto___in_object_literals/basic_support/error.txt))
- multiple __proto__ is an error ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/__proto___in_object_literals/multiple___proto___is_an_error/error.txt))
- not a computed property ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/__proto___in_object_literals/not_a_computed_property/error.txt))
- not a shorthand property ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/__proto___in_object_literals/not_a_shorthand_property/error.txt))
- not a shorthand method ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/__proto___in_object_literals/not_a_shorthand_method/error.txt))

### Object.prototype.__proto__
- get prototype ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/Object.prototype.__proto__/get_prototype/error.txt))
- set prototype ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/Object.prototype.__proto__/set_prototype/error.txt))
- absent from Object.create(null) ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/Object.prototype.__proto__/absent_from_Object.create_null_/error.txt))
- present in hasOwnProperty() ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/Object.prototype.__proto__/present_in_hasOwnProperty__/error.txt))
- correct property descriptor ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/Object.prototype.__proto__/correct_property_descriptor/error.txt))
- present in Object.getOwnPropertyNames() ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/Object.prototype.__proto__/present_in_Object.getOwnPropertyNames__/error.txt))

### String.prototype HTML methods
- existence ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/String.prototype_HTML_methods/existence/error.txt))
- tags' names are lowercase ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/String.prototype_HTML_methods/tags_names_are_lowercase/error.txt))
- quotes in arguments are escaped ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/String.prototype_HTML_methods/quotes_in_arguments_are_escaped/error.txt))

### RegExp.prototype.compile
- basic functionality ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/RegExp.prototype.compile/basic_functionality/error.txt))
- returns this ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/RegExp.prototype.compile/returns_this/error.txt))

### RegExp syntax extensions
- hyphens in character sets ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/RegExp_syntax_extensions/hyphens_in_character_sets/error.txt))
- invalid character escapes ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/RegExp_syntax_extensions/invalid_character_escapes/error.txt))
- invalid control-character escapes ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/RegExp_syntax_extensions/invalid_control-character_escapes/error.txt))
- invalid Unicode escapes ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/RegExp_syntax_extensions/invalid_Unicode_escapes/error.txt))
- invalid hexadecimal escapes ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/RegExp_syntax_extensions/invalid_hexadecimal_escapes/error.txt))
- incomplete patterns and quantifiers ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/RegExp_syntax_extensions/incomplete_patterns_and_quantifiers/error.txt))
- octal escape sequences ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/RegExp_syntax_extensions/octal_escape_sequences/error.txt))
- invalid backreferences become octal escapes ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/RegExp_syntax_extensions/invalid_backreferences_become_octal_escapes/error.txt))

### HTML-style comments
- HTML-style comments ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/nightly/annex_b/HTML-style_comments/error.txt))