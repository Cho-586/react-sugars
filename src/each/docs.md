# Each Block

## Explanation

The each block allows you to render lists in react.

## Props

### required / _Not required_

- **of** - The array you want to render. Example:

```
  const items = [{
    id: 1, text: "Finish this array"
  }]

  <Each of={items}>
  {/* The rest of the code */}
  </Each>
```

- **_key_** - Key based off the item in the array i.e you can use any key of an object in an array of objects (make sure the key is unique). This is unrequired though if you don't need to be explicit

```
  <Each of={items} key={}>
  {/* The rest of the code */}
  </Each>
```
