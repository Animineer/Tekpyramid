1)Typescript -
        superset of js-
        * static type(declare variable data type)
        * catch error at compile time (instead of run time)
        *easy to maintain large codebase
        *compile to js before running

2)Typescript over Javascript
        js -dynamic, error appears in runtime- difficutl to maintain large project - no compilation is required
          
3)Basic datatypes
   	Primitive -number ,string , boolean bigint ,symbol,undefined, null
	Non-primitive- array ,tupple(fixed length array with specific types) , object, function
	Special- any , unknown (type checking) ,void, never (no return )

4)Type inference
5)type alias vs interface
    *type - create a new name for any type ,
     cannot be reopende after declaration , 
     can represent primitive, union, intersction , tuple, object
    
    * Interface - primarily used to define oblect shapes , 
    can be extended and merged (useful in large projects) , 
    describe object , function , arrays or classes

6)Enum - enumeration - allow you to define a set of named constant - 
    code readable and maintainable 
    - used when a variable can have limited possible values

7)Generics -allows to write function, classes or interface that work with multiple types (while maintaining     type safety ) -eg:placeholder of types , 
reuse code without sacrificing type checking

8)Diff b/w any and unknown
    * any - allows a variable to hold any type -unsafe (similar to plain js) 
    * unknown - allows any value , but Typescript forces type check before usage 

9)Diff b/w void and never
    * void- represent no return value from function , used when function does something but not return anythin
    * never - represent a value that never occurs , used when a function 1. always throw an error (or) never  returns normally (infinite loop)

10)inheritance , encapsulation , abstraction , Polymorphism
