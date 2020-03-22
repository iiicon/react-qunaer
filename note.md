# react-qunaer

practice react-hooks

## context

Provider
Consumer
contextType // 一个 context 值的时候可以使用

    static contextType = ssContext
    const xx = this.context

## 处理文件导入失败等类似错误

1.  ComponentDidCatch

        ComponentDidCatch() {}

2.  getDerivedStateFromError

        static getDerivedStateFromError() { return {} // 会和 state 合并}

## 处理组件不重新渲染

1. pureComponent 需要注意对象会导致不重新渲染
2. memo 包裹函数组件，注意绑定事件要写箭头函数

## 类组件的不足（react 团队）

1. 难以复用状态逻辑
   缺少复用机制，渲染属性和高阶组件导致层级冗余

2. 趋向复杂难以维护
   生命周期函数混杂不相干的逻辑
   相干逻辑分散在不同的生命周期

3. this 指向困扰
   内联函数过度创建新句柄
   类成员函数不能保证 this

## 快捷键（MacOS）

切换文件

    cmd + shift + ]/[

## 问题

- ~~事件用箭头函数~~

## hooks useState

    const [name, setName] = useState(() => {
      return props.name || "GerritV";
    }); // 这种写法只能触发一次

## hooks useEffect

    useEffect(()=>{}, []:deep)
    没有第二个参数默认是每次都会执行，有参数会在参数变化的时候执行，空数组代表不会有变化，只执行一次

    通过控制参数我们就能实现在 componentDidMount 和 componentDidUpdate 执行

    如果 fn 返回一个回调函数，回调会在 componentWillUnmount 执行

## hooks useContext

    useContext(ContextObj) 获取 Provider 传递的值

## hooks useMemo

    useMemo(()=>{reutrn fn},[]:deep) ===
    useCallback(fn, []:deep)

    useMemo useCallback 会根据依赖是否变化执行函数,一定要注意的是依赖不变化，不一定不执行

    setValue在useMemo中可以不写依赖，直接用参数setValue(value=>value+1)
