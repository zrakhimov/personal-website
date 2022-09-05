---
title: 'Custom Array List'
date: 'September 5, 2022'
excerpt: 'Custom Array List Implementation'
cover_image: '/images/posts/img6.jpg'
---

# Custom Array List

<b>Arrays</b> are a consecutive block of memory set at a certain length which stores information.

Unlike arrays, <b>List</b> is also a collection of consecutively arranged data, but on a more abstract level. List allows adding/removing elements at different positions (beginning, middle or end).

An example of such Abstract Data Type (ADT) in C# is the `System.Collections.IList` interface. But in this blog, we'll implement our own array based List. It's achieved by using <b>array</b> with <b>dynamic resizing</b>. In this custom implementation, our class will be able to hold any data type `<T>` through the concept of Generics

## Creating the class `ArrayList<T>`

1. We need to give a name to our class, which will be `ArrayList<T>`.
2. Create an `array` which will hold the values in our list, as well as `count` to keep track of how many elements we have in our list.
3. Set a getter for count by creating a `Count` property.
4. We also need to define a constructor to initiate an object of this class. The default capacity at creation for this example will be `4` if capacity is not given. The reason for this is to avoid resizing right away when first couple of elements is added.

```cs
public class ArrayList<T> {
    private T[] array;
    private int count;
    private const int DEFAULT_CAPACITY = 4;

    public int Count {
        get
        {
            return this.count;
        }
    }

    ArrayList(int capacity = DEFAULT_CAPACITY) {
        this.array = new T[capacity];
    }

}
```

## Growing Operation

One of the important parts of `ArrayList` unlike regular arrays, that it has the ability to auto resize when the list is full. Let's implement this function first to get it out of way.

So the logic would be to double the size of the capacity whenever the list is full

1. Create `private` function to check this (called it `AutoResizeWhenFull`)
2. Check if after adding one item, the count is more than the length of the array
3. If `true` create a new array double the size of the current array
4. Copy all the elements inside the original array to the bigger array using built-in `Array.Copy` method

> <b>`Array.Copy()`</b>
> If `sourceArray` and `destinationArray` are both reference-type arrays or are both arrays of type Object, a shallow copy is performed. A shallow copy of an Array is a new Array containing references to the same elements as the original Array. The elements themselves or anything referenced by the elements are not copied. In contrast, a deep copy of an Array copies the elements and everything directly or indirectly referenced by the elements.
> https://docs.microsoft.com/en-us/dotnet/api/system.array.copy?view=net-6.0

5. Change current array with bigger array. The now the old array will be cleaned out by garbage collector since it lost it's reference changed to the bigger array.

```cs
public class ArrayList<T> {
    private T[] array;
    private int count;
    private const int DEFAULT_CAPACITY = 4;

    public int Count {
        get
        {
            return this.count;
        }
    }

    ArrayList(int capacity = DEFAULT_CAPACITY) {
        this.array = new T[capacity];
    }

    private void AutoResizeWhenFull() {
        if(this.count + 1 > this.array.Length) {
            T[] bigger_array = new T[this.array.Length * 2];
            Array.Copy(this.array, bigger_array, this.count);
            this.array = bigger_array;
        }
    }

}

```

## Basic methods

Basic methods that the standard `IList` implements are as folows:

- `int Add(object)` – adds element in the end of the list
- `void Insert(int, object)` – adds element on a preliminary chosen position in the list
- `void Clear()` – removes all elements in the list
- `bool Contains(object)` – checks whether the list contains the element
- `void Remove(object)` – removes the element from the list
- `void RemoveAt(int)` – removes the element on a given position
- `int IndexOf(object)` – returns the position of the element
- `this[int]` – indexer, allows access to the elements on a set position