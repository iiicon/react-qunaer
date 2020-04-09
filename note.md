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
2. memo 包裹函数组件，可以优化函数组件，注意绑定事件要写箭头函数

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

选择内容的快捷键很重要

多行编辑（win）
多行光标 自己配的 clone caret above`ctrl alt ↑` 和 clone caret below`ctrl alt ↓`

## 问题

-   ~~事件用箭头函数~~

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

## hooks useRef

    获取子组件或者dom节点的句柄
    渲染周期之间共享数据的存储

## 自定义 hooks

    use开头的函数
    可以逻辑复用，也可以返回jsx
    函数可以用usecallback优化

## Hooks 规则

     1. Only Call Hooks at the Top Level
     2. Only Call Hooks from React Functions or other Hooks

## 对传统 React 编程的影响

1. 生命周期函数如何映射到 Hooks
2. 类实例成员变量如何映射到 Hooks
3. Hooks 中如何获取历史 Props 和 state
4. 如何强制更新一个 Hooks 组件

## redux 三大原则

单一数据源
状态不可变
纯函数修改状态

## 描述 redux

## 总结 useCallback useMemo 的用法

## 列表组件封装的目的

为了不至于少数组件的变动，导致所有组件的重新渲染

## 组件化粒度原则的思考和总结

## vue 和 react 的一些区别

-   vue 子组件触发父组件事件要 trigger react 直接调用父组件传过来的属性

-   有 set toogle remove 等事件类型，传递到对应子组件执行
-   用 dispatch 做中间函数，传递 action 进来，触发 setTodo, 向下传递的函数都改成 dispatch
-   每一次都要构造一个 action 对象，有点烦，我们写函数创造 action
-   把 action 替换之后我们发现，比如 addTodo 就是 dispatch(createAdd(payload))
    我们可以把这一步写成一个函数 addTodo = (payload) => dispatch(createAdd(payload))
    我用需要用一个函数实现封装，这个函数接受一个 createAction 的对象和 dispatch 函数，返回对应的操作函数
    这样我们就把 dispatch 这一步也省略了
-   因为刚开始只有一个 todos 的属性，新增了之后我们现在还是以 action 的维度，这样有点复杂，我们可以改成数据的维度
    首先我们抽离一个 reducer 函数，这个函数接受全部数据 state 和 action 参数，返回新的 state，根据不同的 type 操作不同数据放到这里
-   接着我们写一个 reducers 是一个 hash 表示不同的数据有不同的 reducer，我们用一个 combineReducers 函数返回 REDUCER 函数，
    在这个函数内部我们遍历 reducers，执行不同的 reducer 函数，最后返回合并后的 state，最后我们把这个 REDUCER 函数导出
-   到现在为止，我们有两个文件一个 actions 用来创建不同的 action，一个 reducers 生成 reducer 函数，这样
    我们在父组件中根据不同的 createAction 函数和 dispatch 就可以组合成自己的 add remove toggle 等函数，
    传给子组件使用，我们在 dispatch 中实现的逻辑就是遍历最新的 state 去 setHooks 就可以了
-   异步 actions 需要自己获取最新的 state，我们可以用全局变量 store 来保存，用函数获取就可以
