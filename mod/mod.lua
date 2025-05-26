
local ____modules = {}
local ____moduleCache = {}
local ____originalRequire = require
local function require(file, ...)
    if ____moduleCache[file] then
        return ____moduleCache[file].value
    end
    if ____modules[file] then
        local module = ____modules[file]
        local value = nil
        if (select("#", ...) > 0) then value = module(...) else value = module(file) end
        ____moduleCache[file] = { value = value }
        return value
    else
        if ____originalRequire then
            return ____originalRequire(file)
        else
            error("module '" .. file .. "' not found")
        end
    end
end
____modules = {
["lualib_bundle"] = function(...) 
local function __TS__ArrayAt(self, relativeIndex)
    local absoluteIndex = relativeIndex < 0 and #self + relativeIndex or relativeIndex
    if absoluteIndex >= 0 and absoluteIndex < #self then
        return self[absoluteIndex + 1]
    end
    return nil
end

local function __TS__ArrayIsArray(value)
    return type(value) == "table" and (value[1] ~= nil or next(value) == nil)
end

local function __TS__ArrayConcat(self, ...)
    local items = {...}
    local result = {}
    local len = 0
    for i = 1, #self do
        len = len + 1
        result[len] = self[i]
    end
    for i = 1, #items do
        local item = items[i]
        if __TS__ArrayIsArray(item) then
            for j = 1, #item do
                len = len + 1
                result[len] = item[j]
            end
        else
            len = len + 1
            result[len] = item
        end
    end
    return result
end

local __TS__Symbol, Symbol
do
    local symbolMetatable = {__tostring = function(self)
        return ("Symbol(" .. (self.description or "")) .. ")"
    end}
    function __TS__Symbol(description)
        return setmetatable({description = description}, symbolMetatable)
    end
    Symbol = {
        asyncDispose = __TS__Symbol("Symbol.asyncDispose"),
        dispose = __TS__Symbol("Symbol.dispose"),
        iterator = __TS__Symbol("Symbol.iterator"),
        hasInstance = __TS__Symbol("Symbol.hasInstance"),
        species = __TS__Symbol("Symbol.species"),
        toStringTag = __TS__Symbol("Symbol.toStringTag")
    }
end

local function __TS__ArrayEntries(array)
    local key = 0
    return {
        [Symbol.iterator] = function(self)
            return self
        end,
        next = function(self)
            local result = {done = array[key + 1] == nil, value = {key, array[key + 1]}}
            key = key + 1
            return result
        end
    }
end

local function __TS__ArrayEvery(self, callbackfn, thisArg)
    for i = 1, #self do
        if not callbackfn(thisArg, self[i], i - 1, self) then
            return false
        end
    end
    return true
end

local function __TS__ArrayFill(self, value, start, ____end)
    local relativeStart = start or 0
    local relativeEnd = ____end or #self
    if relativeStart < 0 then
        relativeStart = relativeStart + #self
    end
    if relativeEnd < 0 then
        relativeEnd = relativeEnd + #self
    end
    do
        local i = relativeStart
        while i < relativeEnd do
            self[i + 1] = value
            i = i + 1
        end
    end
    return self
end

local function __TS__ArrayFilter(self, callbackfn, thisArg)
    local result = {}
    local len = 0
    for i = 1, #self do
        if callbackfn(thisArg, self[i], i - 1, self) then
            len = len + 1
            result[len] = self[i]
        end
    end
    return result
end

local function __TS__ArrayForEach(self, callbackFn, thisArg)
    for i = 1, #self do
        callbackFn(thisArg, self[i], i - 1, self)
    end
end

local function __TS__ArrayFind(self, predicate, thisArg)
    for i = 1, #self do
        local elem = self[i]
        if predicate(thisArg, elem, i - 1, self) then
            return elem
        end
    end
    return nil
end

local function __TS__ArrayFindIndex(self, callbackFn, thisArg)
    for i = 1, #self do
        if callbackFn(thisArg, self[i], i - 1, self) then
            return i - 1
        end
    end
    return -1
end

local __TS__Iterator
do
    local function iteratorGeneratorStep(self)
        local co = self.____coroutine
        local status, value = coroutine.resume(co)
        if not status then
            error(value, 0)
        end
        if coroutine.status(co) == "dead" then
            return
        end
        return true, value
    end
    local function iteratorIteratorStep(self)
        local result = self:next()
        if result.done then
            return
        end
        return true, result.value
    end
    local function iteratorStringStep(self, index)
        index = index + 1
        if index > #self then
            return
        end
        return index, string.sub(self, index, index)
    end
    function __TS__Iterator(iterable)
        if type(iterable) == "string" then
            return iteratorStringStep, iterable, 0
        elseif iterable.____coroutine ~= nil then
            return iteratorGeneratorStep, iterable
        elseif iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            return iteratorIteratorStep, iterator
        else
            return ipairs(iterable)
        end
    end
end

local __TS__ArrayFrom
do
    local function arrayLikeStep(self, index)
        index = index + 1
        if index > self.length then
            return
        end
        return index, self[index]
    end
    local function arrayLikeIterator(arr)
        if type(arr.length) == "number" then
            return arrayLikeStep, arr, 0
        end
        return __TS__Iterator(arr)
    end
    function __TS__ArrayFrom(arrayLike, mapFn, thisArg)
        local result = {}
        if mapFn == nil then
            for ____, v in arrayLikeIterator(arrayLike) do
                result[#result + 1] = v
            end
        else
            local i = 0
            for ____, v in arrayLikeIterator(arrayLike) do
                local ____mapFn_3 = mapFn
                local ____thisArg_1 = thisArg
                local ____v_2 = v
                local ____i_0 = i
                i = ____i_0 + 1
                result[#result + 1] = ____mapFn_3(____thisArg_1, ____v_2, ____i_0)
            end
        end
        return result
    end
end

local function __TS__ArrayIncludes(self, searchElement, fromIndex)
    if fromIndex == nil then
        fromIndex = 0
    end
    local len = #self
    local k = fromIndex
    if fromIndex < 0 then
        k = len + fromIndex
    end
    if k < 0 then
        k = 0
    end
    for i = k + 1, len do
        if self[i] == searchElement then
            return true
        end
    end
    return false
end

local function __TS__ArrayIndexOf(self, searchElement, fromIndex)
    if fromIndex == nil then
        fromIndex = 0
    end
    local len = #self
    if len == 0 then
        return -1
    end
    if fromIndex >= len then
        return -1
    end
    if fromIndex < 0 then
        fromIndex = len + fromIndex
        if fromIndex < 0 then
            fromIndex = 0
        end
    end
    for i = fromIndex + 1, len do
        if self[i] == searchElement then
            return i - 1
        end
    end
    return -1
end

local function __TS__ArrayJoin(self, separator)
    if separator == nil then
        separator = ","
    end
    local parts = {}
    for i = 1, #self do
        parts[i] = tostring(self[i])
    end
    return table.concat(parts, separator)
end

local function __TS__ArrayMap(self, callbackfn, thisArg)
    local result = {}
    for i = 1, #self do
        result[i] = callbackfn(thisArg, self[i], i - 1, self)
    end
    return result
end

local function __TS__ArrayPush(self, ...)
    local items = {...}
    local len = #self
    for i = 1, #items do
        len = len + 1
        self[len] = items[i]
    end
    return len
end

local function __TS__ArrayPushArray(self, items)
    local len = #self
    for i = 1, #items do
        len = len + 1
        self[len] = items[i]
    end
    return len
end

local function __TS__CountVarargs(...)
    return select("#", ...)
end

local function __TS__ArrayReduce(self, callbackFn, ...)
    local len = #self
    local k = 0
    local accumulator = nil
    if __TS__CountVarargs(...) ~= 0 then
        accumulator = ...
    elseif len > 0 then
        accumulator = self[1]
        k = 1
    else
        error("Reduce of empty array with no initial value", 0)
    end
    for i = k + 1, len do
        accumulator = callbackFn(
            nil,
            accumulator,
            self[i],
            i - 1,
            self
        )
    end
    return accumulator
end

local function __TS__ArrayReduceRight(self, callbackFn, ...)
    local len = #self
    local k = len - 1
    local accumulator = nil
    if __TS__CountVarargs(...) ~= 0 then
        accumulator = ...
    elseif len > 0 then
        accumulator = self[k + 1]
        k = k - 1
    else
        error("Reduce of empty array with no initial value", 0)
    end
    for i = k + 1, 1, -1 do
        accumulator = callbackFn(
            nil,
            accumulator,
            self[i],
            i - 1,
            self
        )
    end
    return accumulator
end

local function __TS__ArrayReverse(self)
    local i = 1
    local j = #self
    while i < j do
        local temp = self[j]
        self[j] = self[i]
        self[i] = temp
        i = i + 1
        j = j - 1
    end
    return self
end

local function __TS__ArrayUnshift(self, ...)
    local items = {...}
    local numItemsToInsert = #items
    if numItemsToInsert == 0 then
        return #self
    end
    for i = #self, 1, -1 do
        self[i + numItemsToInsert] = self[i]
    end
    for i = 1, numItemsToInsert do
        self[i] = items[i]
    end
    return #self
end

local function __TS__ArraySort(self, compareFn)
    if compareFn ~= nil then
        table.sort(
            self,
            function(a, b) return compareFn(nil, a, b) < 0 end
        )
    else
        table.sort(self)
    end
    return self
end

local function __TS__ArraySlice(self, first, last)
    local len = #self
    first = first or 0
    if first < 0 then
        first = len + first
        if first < 0 then
            first = 0
        end
    else
        if first > len then
            first = len
        end
    end
    last = last or len
    if last < 0 then
        last = len + last
        if last < 0 then
            last = 0
        end
    else
        if last > len then
            last = len
        end
    end
    local out = {}
    first = first + 1
    last = last + 1
    local n = 1
    while first < last do
        out[n] = self[first]
        first = first + 1
        n = n + 1
    end
    return out
end

local function __TS__ArraySome(self, callbackfn, thisArg)
    for i = 1, #self do
        if callbackfn(thisArg, self[i], i - 1, self) then
            return true
        end
    end
    return false
end

local function __TS__ArraySplice(self, ...)
    local args = {...}
    local len = #self
    local actualArgumentCount = __TS__CountVarargs(...)
    local start = args[1]
    local deleteCount = args[2]
    if start < 0 then
        start = len + start
        if start < 0 then
            start = 0
        end
    elseif start > len then
        start = len
    end
    local itemCount = actualArgumentCount - 2
    if itemCount < 0 then
        itemCount = 0
    end
    local actualDeleteCount
    if actualArgumentCount == 0 then
        actualDeleteCount = 0
    elseif actualArgumentCount == 1 then
        actualDeleteCount = len - start
    else
        actualDeleteCount = deleteCount or 0
        if actualDeleteCount < 0 then
            actualDeleteCount = 0
        end
        if actualDeleteCount > len - start then
            actualDeleteCount = len - start
        end
    end
    local out = {}
    for k = 1, actualDeleteCount do
        local from = start + k
        if self[from] ~= nil then
            out[k] = self[from]
        end
    end
    if itemCount < actualDeleteCount then
        for k = start + 1, len - actualDeleteCount do
            local from = k + actualDeleteCount
            local to = k + itemCount
            if self[from] then
                self[to] = self[from]
            else
                self[to] = nil
            end
        end
        for k = len - actualDeleteCount + itemCount + 1, len do
            self[k] = nil
        end
    elseif itemCount > actualDeleteCount then
        for k = len - actualDeleteCount, start + 1, -1 do
            local from = k + actualDeleteCount
            local to = k + itemCount
            if self[from] then
                self[to] = self[from]
            else
                self[to] = nil
            end
        end
    end
    local j = start + 1
    for i = 3, actualArgumentCount do
        self[j] = args[i]
        j = j + 1
    end
    for k = #self, len - actualDeleteCount + itemCount + 1, -1 do
        self[k] = nil
    end
    return out
end

local function __TS__ArrayToObject(self)
    local object = {}
    for i = 1, #self do
        object[i - 1] = self[i]
    end
    return object
end

local function __TS__ArrayFlat(self, depth)
    if depth == nil then
        depth = 1
    end
    local result = {}
    local len = 0
    for i = 1, #self do
        local value = self[i]
        if depth > 0 and __TS__ArrayIsArray(value) then
            local toAdd
            if depth == 1 then
                toAdd = value
            else
                toAdd = __TS__ArrayFlat(value, depth - 1)
            end
            for j = 1, #toAdd do
                local val = toAdd[j]
                len = len + 1
                result[len] = val
            end
        else
            len = len + 1
            result[len] = value
        end
    end
    return result
end

local function __TS__ArrayFlatMap(self, callback, thisArg)
    local result = {}
    local len = 0
    for i = 1, #self do
        local value = callback(thisArg, self[i], i - 1, self)
        if __TS__ArrayIsArray(value) then
            for j = 1, #value do
                len = len + 1
                result[len] = value[j]
            end
        else
            len = len + 1
            result[len] = value
        end
    end
    return result
end

local function __TS__ArraySetLength(self, length)
    if length < 0 or length ~= length or length == math.huge or math.floor(length) ~= length then
        error(
            "invalid array length: " .. tostring(length),
            0
        )
    end
    for i = length + 1, #self do
        self[i] = nil
    end
    return length
end

local __TS__Unpack = table.unpack or unpack

local function __TS__ArrayToReversed(self)
    local copy = {__TS__Unpack(self)}
    __TS__ArrayReverse(copy)
    return copy
end

local function __TS__ArrayToSorted(self, compareFn)
    local copy = {__TS__Unpack(self)}
    __TS__ArraySort(copy, compareFn)
    return copy
end

local function __TS__ArrayToSpliced(self, start, deleteCount, ...)
    local copy = {__TS__Unpack(self)}
    __TS__ArraySplice(copy, start, deleteCount, ...)
    return copy
end

local function __TS__ArrayWith(self, index, value)
    local copy = {__TS__Unpack(self)}
    copy[index + 1] = value
    return copy
end

local function __TS__New(target, ...)
    local instance = setmetatable({}, target.prototype)
    instance:____constructor(...)
    return instance
end

local function __TS__InstanceOf(obj, classTbl)
    if type(classTbl) ~= "table" then
        error("Right-hand side of 'instanceof' is not an object", 0)
    end
    if classTbl[Symbol.hasInstance] ~= nil then
        return not not classTbl[Symbol.hasInstance](classTbl, obj)
    end
    if type(obj) == "table" then
        local luaClass = obj.constructor
        while luaClass ~= nil do
            if luaClass == classTbl then
                return true
            end
            luaClass = luaClass.____super
        end
    end
    return false
end

local function __TS__Class(self)
    local c = {prototype = {}}
    c.prototype.__index = c.prototype
    c.prototype.constructor = c
    return c
end

local __TS__Promise
do
    local function makeDeferredPromiseFactory()
        local resolve
        local reject
        local function executor(____, res, rej)
            resolve = res
            reject = rej
        end
        return function()
            local promise = __TS__New(__TS__Promise, executor)
            return promise, resolve, reject
        end
    end
    local makeDeferredPromise = makeDeferredPromiseFactory()
    local function isPromiseLike(value)
        return __TS__InstanceOf(value, __TS__Promise)
    end
    local function doNothing(self)
    end
    local ____pcall = _G.pcall
    __TS__Promise = __TS__Class()
    __TS__Promise.name = "__TS__Promise"
    function __TS__Promise.prototype.____constructor(self, executor)
        self.state = 0
        self.fulfilledCallbacks = {}
        self.rejectedCallbacks = {}
        self.finallyCallbacks = {}
        local success, ____error = ____pcall(
            executor,
            nil,
            function(____, v) return self:resolve(v) end,
            function(____, err) return self:reject(err) end
        )
        if not success then
            self:reject(____error)
        end
    end
    function __TS__Promise.resolve(value)
        if __TS__InstanceOf(value, __TS__Promise) then
            return value
        end
        local promise = __TS__New(__TS__Promise, doNothing)
        promise.state = 1
        promise.value = value
        return promise
    end
    function __TS__Promise.reject(reason)
        local promise = __TS__New(__TS__Promise, doNothing)
        promise.state = 2
        promise.rejectionReason = reason
        return promise
    end
    __TS__Promise.prototype["then"] = function(self, onFulfilled, onRejected)
        local promise, resolve, reject = makeDeferredPromise()
        self:addCallbacks(
            onFulfilled and self:createPromiseResolvingCallback(onFulfilled, resolve, reject) or resolve,
            onRejected and self:createPromiseResolvingCallback(onRejected, resolve, reject) or reject
        )
        return promise
    end
    function __TS__Promise.prototype.addCallbacks(self, fulfilledCallback, rejectedCallback)
        if self.state == 1 then
            return fulfilledCallback(nil, self.value)
        end
        if self.state == 2 then
            return rejectedCallback(nil, self.rejectionReason)
        end
        local ____self_fulfilledCallbacks_0 = self.fulfilledCallbacks
        ____self_fulfilledCallbacks_0[#____self_fulfilledCallbacks_0 + 1] = fulfilledCallback
        local ____self_rejectedCallbacks_1 = self.rejectedCallbacks
        ____self_rejectedCallbacks_1[#____self_rejectedCallbacks_1 + 1] = rejectedCallback
    end
    function __TS__Promise.prototype.catch(self, onRejected)
        return self["then"](self, nil, onRejected)
    end
    function __TS__Promise.prototype.finally(self, onFinally)
        if onFinally then
            local ____self_finallyCallbacks_2 = self.finallyCallbacks
            ____self_finallyCallbacks_2[#____self_finallyCallbacks_2 + 1] = onFinally
            if self.state ~= 0 then
                onFinally(nil)
            end
        end
        return self
    end
    function __TS__Promise.prototype.resolve(self, value)
        if isPromiseLike(value) then
            return value:addCallbacks(
                function(____, v) return self:resolve(v) end,
                function(____, err) return self:reject(err) end
            )
        end
        if self.state == 0 then
            self.state = 1
            self.value = value
            return self:invokeCallbacks(self.fulfilledCallbacks, value)
        end
    end
    function __TS__Promise.prototype.reject(self, reason)
        if self.state == 0 then
            self.state = 2
            self.rejectionReason = reason
            return self:invokeCallbacks(self.rejectedCallbacks, reason)
        end
    end
    function __TS__Promise.prototype.invokeCallbacks(self, callbacks, value)
        local callbacksLength = #callbacks
        local finallyCallbacks = self.finallyCallbacks
        local finallyCallbacksLength = #finallyCallbacks
        if callbacksLength ~= 0 then
            for i = 1, callbacksLength - 1 do
                callbacks[i](callbacks, value)
            end
            if finallyCallbacksLength == 0 then
                return callbacks[callbacksLength](callbacks, value)
            end
            callbacks[callbacksLength](callbacks, value)
        end
        if finallyCallbacksLength ~= 0 then
            for i = 1, finallyCallbacksLength - 1 do
                finallyCallbacks[i](finallyCallbacks)
            end
            return finallyCallbacks[finallyCallbacksLength](finallyCallbacks)
        end
    end
    function __TS__Promise.prototype.createPromiseResolvingCallback(self, f, resolve, reject)
        return function(____, value)
            local success, resultOrError = ____pcall(f, nil, value)
            if not success then
                return reject(nil, resultOrError)
            end
            return self:handleCallbackValue(resultOrError, resolve, reject)
        end
    end
    function __TS__Promise.prototype.handleCallbackValue(self, value, resolve, reject)
        if isPromiseLike(value) then
            local nextpromise = value
            if nextpromise.state == 1 then
                return resolve(nil, nextpromise.value)
            elseif nextpromise.state == 2 then
                return reject(nil, nextpromise.rejectionReason)
            else
                return nextpromise:addCallbacks(resolve, reject)
            end
        else
            return resolve(nil, value)
        end
    end
end

local __TS__AsyncAwaiter, __TS__Await
do
    local ____coroutine = _G.coroutine or ({})
    local cocreate = ____coroutine.create
    local coresume = ____coroutine.resume
    local costatus = ____coroutine.status
    local coyield = ____coroutine.yield
    function __TS__AsyncAwaiter(generator)
        return __TS__New(
            __TS__Promise,
            function(____, resolve, reject)
                local fulfilled, step, resolved, asyncCoroutine
                function fulfilled(self, value)
                    local success, resultOrError = coresume(asyncCoroutine, value)
                    if success then
                        return step(resultOrError)
                    end
                    return reject(nil, resultOrError)
                end
                function step(result)
                    if resolved then
                        return
                    end
                    if costatus(asyncCoroutine) == "dead" then
                        return resolve(nil, result)
                    end
                    return __TS__Promise.resolve(result):addCallbacks(fulfilled, reject)
                end
                resolved = false
                asyncCoroutine = cocreate(generator)
                local success, resultOrError = coresume(
                    asyncCoroutine,
                    function(____, v)
                        resolved = true
                        return __TS__Promise.resolve(v):addCallbacks(resolve, reject)
                    end
                )
                if success then
                    return step(resultOrError)
                else
                    return reject(nil, resultOrError)
                end
            end
        )
    end
    function __TS__Await(thing)
        return coyield(thing)
    end
end

local function __TS__ClassExtends(target, base)
    target.____super = base
    local staticMetatable = setmetatable({__index = base}, base)
    setmetatable(target, staticMetatable)
    local baseMetatable = getmetatable(base)
    if baseMetatable then
        if type(baseMetatable.__index) == "function" then
            staticMetatable.__index = baseMetatable.__index
        end
        if type(baseMetatable.__newindex) == "function" then
            staticMetatable.__newindex = baseMetatable.__newindex
        end
    end
    setmetatable(target.prototype, base.prototype)
    if type(base.prototype.__index) == "function" then
        target.prototype.__index = base.prototype.__index
    end
    if type(base.prototype.__newindex) == "function" then
        target.prototype.__newindex = base.prototype.__newindex
    end
    if type(base.prototype.__tostring) == "function" then
        target.prototype.__tostring = base.prototype.__tostring
    end
end

local function __TS__CloneDescriptor(____bindingPattern0)
    local value
    local writable
    local set
    local get
    local configurable
    local enumerable
    enumerable = ____bindingPattern0.enumerable
    configurable = ____bindingPattern0.configurable
    get = ____bindingPattern0.get
    set = ____bindingPattern0.set
    writable = ____bindingPattern0.writable
    value = ____bindingPattern0.value
    local descriptor = {enumerable = enumerable == true, configurable = configurable == true}
    local hasGetterOrSetter = get ~= nil or set ~= nil
    local hasValueOrWritableAttribute = writable ~= nil or value ~= nil
    if hasGetterOrSetter and hasValueOrWritableAttribute then
        error("Invalid property descriptor. Cannot both specify accessors and a value or writable attribute.", 0)
    end
    if get or set then
        descriptor.get = get
        descriptor.set = set
    else
        descriptor.value = value
        descriptor.writable = writable == true
    end
    return descriptor
end

local function __TS__Decorate(self, originalValue, decorators, context)
    local result = originalValue
    do
        local i = #decorators
        while i >= 0 do
            local decorator = decorators[i + 1]
            if decorator ~= nil then
                local ____decorator_result_0 = decorator(self, result, context)
                if ____decorator_result_0 == nil then
                    ____decorator_result_0 = result
                end
                result = ____decorator_result_0
            end
            i = i - 1
        end
    end
    return result
end

local function __TS__ObjectAssign(target, ...)
    local sources = {...}
    for i = 1, #sources do
        local source = sources[i]
        for key in pairs(source) do
            target[key] = source[key]
        end
    end
    return target
end

local function __TS__ObjectGetOwnPropertyDescriptor(object, key)
    local metatable = getmetatable(object)
    if not metatable then
        return
    end
    if not rawget(metatable, "_descriptors") then
        return
    end
    return rawget(metatable, "_descriptors")[key]
end

local __TS__DescriptorGet
do
    local getmetatable = _G.getmetatable
    local ____rawget = _G.rawget
    function __TS__DescriptorGet(self, metatable, key)
        while metatable do
            local rawResult = ____rawget(metatable, key)
            if rawResult ~= nil then
                return rawResult
            end
            local descriptors = ____rawget(metatable, "_descriptors")
            if descriptors then
                local descriptor = descriptors[key]
                if descriptor ~= nil then
                    if descriptor.get then
                        return descriptor.get(self)
                    end
                    return descriptor.value
                end
            end
            metatable = getmetatable(metatable)
        end
    end
end

local __TS__DescriptorSet
do
    local getmetatable = _G.getmetatable
    local ____rawget = _G.rawget
    local rawset = _G.rawset
    function __TS__DescriptorSet(self, metatable, key, value)
        while metatable do
            local descriptors = ____rawget(metatable, "_descriptors")
            if descriptors then
                local descriptor = descriptors[key]
                if descriptor ~= nil then
                    if descriptor.set then
                        descriptor.set(self, value)
                    else
                        if descriptor.writable == false then
                            error(
                                ((("Cannot assign to read only property '" .. key) .. "' of object '") .. tostring(self)) .. "'",
                                0
                            )
                        end
                        descriptor.value = value
                    end
                    return
                end
            end
            metatable = getmetatable(metatable)
        end
        rawset(self, key, value)
    end
end

local __TS__SetDescriptor
do
    local getmetatable = _G.getmetatable
    local function descriptorIndex(self, key)
        return __TS__DescriptorGet(
            self,
            getmetatable(self),
            key
        )
    end
    local function descriptorNewIndex(self, key, value)
        return __TS__DescriptorSet(
            self,
            getmetatable(self),
            key,
            value
        )
    end
    function __TS__SetDescriptor(target, key, desc, isPrototype)
        if isPrototype == nil then
            isPrototype = false
        end
        local ____isPrototype_0
        if isPrototype then
            ____isPrototype_0 = target
        else
            ____isPrototype_0 = getmetatable(target)
        end
        local metatable = ____isPrototype_0
        if not metatable then
            metatable = {}
            setmetatable(target, metatable)
        end
        local value = rawget(target, key)
        if value ~= nil then
            rawset(target, key, nil)
        end
        if not rawget(metatable, "_descriptors") then
            metatable._descriptors = {}
        end
        metatable._descriptors[key] = __TS__CloneDescriptor(desc)
        metatable.__index = descriptorIndex
        metatable.__newindex = descriptorNewIndex
    end
end

local function __TS__DecorateLegacy(decorators, target, key, desc)
    local result = target
    do
        local i = #decorators
        while i >= 0 do
            local decorator = decorators[i + 1]
            if decorator ~= nil then
                local oldResult = result
                if key == nil then
                    result = decorator(nil, result)
                elseif desc == true then
                    local value = rawget(target, key)
                    local descriptor = __TS__ObjectGetOwnPropertyDescriptor(target, key) or ({configurable = true, writable = true, value = value})
                    local desc = decorator(nil, target, key, descriptor) or descriptor
                    local isSimpleValue = desc.configurable == true and desc.writable == true and not desc.get and not desc.set
                    if isSimpleValue then
                        rawset(target, key, desc.value)
                    else
                        __TS__SetDescriptor(
                            target,
                            key,
                            __TS__ObjectAssign({}, descriptor, desc)
                        )
                    end
                elseif desc == false then
                    result = decorator(nil, target, key, desc)
                else
                    result = decorator(nil, target, key)
                end
                result = result or oldResult
            end
            i = i - 1
        end
    end
    return result
end

local function __TS__DecorateParam(paramIndex, decorator)
    return function(____, target, key) return decorator(nil, target, key, paramIndex) end
end

local function __TS__StringIncludes(self, searchString, position)
    if not position then
        position = 1
    else
        position = position + 1
    end
    local index = string.find(self, searchString, position, true)
    return index ~= nil
end

local Error, RangeError, ReferenceError, SyntaxError, TypeError, URIError
do
    local function getErrorStack(self, constructor)
        if debug == nil then
            return nil
        end
        local level = 1
        while true do
            local info = debug.getinfo(level, "f")
            level = level + 1
            if not info then
                level = 1
                break
            elseif info.func == constructor then
                break
            end
        end
        if __TS__StringIncludes(_VERSION, "Lua 5.0") then
            return debug.traceback(("[Level " .. tostring(level)) .. "]")
        elseif _VERSION == "Lua 5.1" then
            return string.sub(
                debug.traceback("", level),
                2
            )
        else
            return debug.traceback(nil, level)
        end
    end
    local function wrapErrorToString(self, getDescription)
        return function(self)
            local description = getDescription(self)
            local caller = debug.getinfo(3, "f")
            local isClassicLua = __TS__StringIncludes(_VERSION, "Lua 5.0")
            if isClassicLua or caller and caller.func ~= error then
                return description
            else
                return (description .. "\n") .. tostring(self.stack)
            end
        end
    end
    local function initErrorClass(self, Type, name)
        Type.name = name
        return setmetatable(
            Type,
            {__call = function(____, _self, message) return __TS__New(Type, message) end}
        )
    end
    local ____initErrorClass_1 = initErrorClass
    local ____class_0 = __TS__Class()
    ____class_0.name = ""
    function ____class_0.prototype.____constructor(self, message)
        if message == nil then
            message = ""
        end
        self.message = message
        self.name = "Error"
        self.stack = getErrorStack(nil, __TS__New)
        local metatable = getmetatable(self)
        if metatable and not metatable.__errorToStringPatched then
            metatable.__errorToStringPatched = true
            metatable.__tostring = wrapErrorToString(nil, metatable.__tostring)
        end
    end
    function ____class_0.prototype.__tostring(self)
        return self.message ~= "" and (self.name .. ": ") .. self.message or self.name
    end
    Error = ____initErrorClass_1(nil, ____class_0, "Error")
    local function createErrorClass(self, name)
        local ____initErrorClass_3 = initErrorClass
        local ____class_2 = __TS__Class()
        ____class_2.name = ____class_2.name
        __TS__ClassExtends(____class_2, Error)
        function ____class_2.prototype.____constructor(self, ...)
            ____class_2.____super.prototype.____constructor(self, ...)
            self.name = name
        end
        return ____initErrorClass_3(nil, ____class_2, name)
    end
    RangeError = createErrorClass(nil, "RangeError")
    ReferenceError = createErrorClass(nil, "ReferenceError")
    SyntaxError = createErrorClass(nil, "SyntaxError")
    TypeError = createErrorClass(nil, "TypeError")
    URIError = createErrorClass(nil, "URIError")
end

local function __TS__ObjectGetOwnPropertyDescriptors(object)
    local metatable = getmetatable(object)
    if not metatable then
        return {}
    end
    return rawget(metatable, "_descriptors") or ({})
end

local function __TS__Delete(target, key)
    local descriptors = __TS__ObjectGetOwnPropertyDescriptors(target)
    local descriptor = descriptors[key]
    if descriptor then
        if not descriptor.configurable then
            error(
                __TS__New(
                    TypeError,
                    ((("Cannot delete property " .. tostring(key)) .. " of ") .. tostring(target)) .. "."
                ),
                0
            )
        end
        descriptors[key] = nil
        return true
    end
    target[key] = nil
    return true
end

local function __TS__StringAccess(self, index)
    if index >= 0 and index < #self then
        return string.sub(self, index + 1, index + 1)
    end
end

local function __TS__DelegatedYield(iterable)
    if type(iterable) == "string" then
        for index = 0, #iterable - 1 do
            coroutine.yield(__TS__StringAccess(iterable, index))
        end
    elseif iterable.____coroutine ~= nil then
        local co = iterable.____coroutine
        while true do
            local status, value = coroutine.resume(co)
            if not status then
                error(value, 0)
            end
            if coroutine.status(co) == "dead" then
                return value
            else
                coroutine.yield(value)
            end
        end
    elseif iterable[Symbol.iterator] then
        local iterator = iterable[Symbol.iterator](iterable)
        while true do
            local result = iterator:next()
            if result.done then
                return result.value
            else
                coroutine.yield(result.value)
            end
        end
    else
        for ____, value in ipairs(iterable) do
            coroutine.yield(value)
        end
    end
end

local function __TS__FunctionBind(fn, ...)
    local boundArgs = {...}
    return function(____, ...)
        local args = {...}
        __TS__ArrayUnshift(
            args,
            __TS__Unpack(boundArgs)
        )
        return fn(__TS__Unpack(args))
    end
end

local __TS__Generator
do
    local function generatorIterator(self)
        return self
    end
    local function generatorNext(self, ...)
        local co = self.____coroutine
        if coroutine.status(co) == "dead" then
            return {done = true}
        end
        local status, value = coroutine.resume(co, ...)
        if not status then
            error(value, 0)
        end
        return {
            value = value,
            done = coroutine.status(co) == "dead"
        }
    end
    function __TS__Generator(fn)
        return function(...)
            local args = {...}
            local argsLength = __TS__CountVarargs(...)
            return {
                ____coroutine = coroutine.create(function() return fn(__TS__Unpack(args, 1, argsLength)) end),
                [Symbol.iterator] = generatorIterator,
                next = generatorNext
            }
        end
    end
end

local function __TS__InstanceOfObject(value)
    local valueType = type(value)
    return valueType == "table" or valueType == "function"
end

local function __TS__LuaIteratorSpread(self, state, firstKey)
    local results = {}
    local key, value = self(state, firstKey)
    while key do
        results[#results + 1] = {key, value}
        key, value = self(state, key)
    end
    return __TS__Unpack(results)
end

local Map
do
    Map = __TS__Class()
    Map.name = "Map"
    function Map.prototype.____constructor(self, entries)
        self[Symbol.toStringTag] = "Map"
        self.items = {}
        self.size = 0
        self.nextKey = {}
        self.previousKey = {}
        if entries == nil then
            return
        end
        local iterable = entries
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                local value = result.value
                self:set(value[1], value[2])
            end
        else
            local array = entries
            for ____, kvp in ipairs(array) do
                self:set(kvp[1], kvp[2])
            end
        end
    end
    function Map.prototype.clear(self)
        self.items = {}
        self.nextKey = {}
        self.previousKey = {}
        self.firstKey = nil
        self.lastKey = nil
        self.size = 0
    end
    function Map.prototype.delete(self, key)
        local contains = self:has(key)
        if contains then
            self.size = self.size - 1
            local next = self.nextKey[key]
            local previous = self.previousKey[key]
            if next ~= nil and previous ~= nil then
                self.nextKey[previous] = next
                self.previousKey[next] = previous
            elseif next ~= nil then
                self.firstKey = next
                self.previousKey[next] = nil
            elseif previous ~= nil then
                self.lastKey = previous
                self.nextKey[previous] = nil
            else
                self.firstKey = nil
                self.lastKey = nil
            end
            self.nextKey[key] = nil
            self.previousKey[key] = nil
        end
        self.items[key] = nil
        return contains
    end
    function Map.prototype.forEach(self, callback)
        for ____, key in __TS__Iterator(self:keys()) do
            callback(nil, self.items[key], key, self)
        end
    end
    function Map.prototype.get(self, key)
        return self.items[key]
    end
    function Map.prototype.has(self, key)
        return self.nextKey[key] ~= nil or self.lastKey == key
    end
    function Map.prototype.set(self, key, value)
        local isNewValue = not self:has(key)
        if isNewValue then
            self.size = self.size + 1
        end
        self.items[key] = value
        if self.firstKey == nil then
            self.firstKey = key
            self.lastKey = key
        elseif isNewValue then
            self.nextKey[self.lastKey] = key
            self.previousKey[key] = self.lastKey
            self.lastKey = key
        end
        return self
    end
    Map.prototype[Symbol.iterator] = function(self)
        return self:entries()
    end
    function Map.prototype.entries(self)
        local items = self.items
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = {key, items[key]}}
                key = nextKey[key]
                return result
            end
        }
    end
    function Map.prototype.keys(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    function Map.prototype.values(self)
        local items = self.items
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = items[key]}
                key = nextKey[key]
                return result
            end
        }
    end
    Map[Symbol.species] = Map
end

local function __TS__MapGroupBy(items, keySelector)
    local result = __TS__New(Map)
    local i = 0
    for ____, item in __TS__Iterator(items) do
        local key = keySelector(nil, item, i)
        if result:has(key) then
            local ____temp_0 = result:get(key)
            ____temp_0[#____temp_0 + 1] = item
        else
            result:set(key, {item})
        end
        i = i + 1
    end
    return result
end

local __TS__Match = string.match

local __TS__MathAtan2 = math.atan2 or math.atan

local __TS__MathModf = math.modf

local function __TS__NumberIsNaN(value)
    return value ~= value
end

local function __TS__MathSign(val)
    if __TS__NumberIsNaN(val) or val == 0 then
        return val
    end
    if val < 0 then
        return -1
    end
    return 1
end

local function __TS__NumberIsFinite(value)
    return type(value) == "number" and value == value and value ~= math.huge and value ~= -math.huge
end

local function __TS__MathTrunc(val)
    if not __TS__NumberIsFinite(val) or val == 0 then
        return val
    end
    return val > 0 and math.floor(val) or math.ceil(val)
end

local function __TS__Number(value)
    local valueType = type(value)
    if valueType == "number" then
        return value
    elseif valueType == "string" then
        local numberValue = tonumber(value)
        if numberValue then
            return numberValue
        end
        if value == "Infinity" then
            return math.huge
        end
        if value == "-Infinity" then
            return -math.huge
        end
        local stringWithoutSpaces = string.gsub(value, "%s", "")
        if stringWithoutSpaces == "" then
            return 0
        end
        return 0 / 0
    elseif valueType == "boolean" then
        return value and 1 or 0
    else
        return 0 / 0
    end
end

local function __TS__NumberIsInteger(value)
    return __TS__NumberIsFinite(value) and math.floor(value) == value
end

local function __TS__StringSubstring(self, start, ____end)
    if ____end ~= ____end then
        ____end = 0
    end
    if ____end ~= nil and start > ____end then
        start, ____end = ____end, start
    end
    if start >= 0 then
        start = start + 1
    else
        start = 1
    end
    if ____end ~= nil and ____end < 0 then
        ____end = 0
    end
    return string.sub(self, start, ____end)
end

local __TS__ParseInt
do
    local parseIntBasePattern = "0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTvVwWxXyYzZ"
    function __TS__ParseInt(numberString, base)
        if base == nil then
            base = 10
            local hexMatch = __TS__Match(numberString, "^%s*-?0[xX]")
            if hexMatch ~= nil then
                base = 16
                numberString = (__TS__Match(hexMatch, "-")) and "-" .. __TS__StringSubstring(numberString, #hexMatch) or __TS__StringSubstring(numberString, #hexMatch)
            end
        end
        if base < 2 or base > 36 then
            return 0 / 0
        end
        local allowedDigits = base <= 10 and __TS__StringSubstring(parseIntBasePattern, 0, base) or __TS__StringSubstring(parseIntBasePattern, 0, 10 + 2 * (base - 10))
        local pattern = ("^%s*(-?[" .. allowedDigits) .. "]*)"
        local number = tonumber((__TS__Match(numberString, pattern)), base)
        if number == nil then
            return 0 / 0
        end
        if number >= 0 then
            return math.floor(number)
        else
            return math.ceil(number)
        end
    end
end

local function __TS__ParseFloat(numberString)
    local infinityMatch = __TS__Match(numberString, "^%s*(-?Infinity)")
    if infinityMatch ~= nil then
        return __TS__StringAccess(infinityMatch, 0) == "-" and -math.huge or math.huge
    end
    local number = tonumber((__TS__Match(numberString, "^%s*(-?%d+%.?%d*)")))
    return number or 0 / 0
end

local __TS__NumberToString
do
    local radixChars = "0123456789abcdefghijklmnopqrstuvwxyz"
    function __TS__NumberToString(self, radix)
        if radix == nil or radix == 10 or self == math.huge or self == -math.huge or self ~= self then
            return tostring(self)
        end
        radix = math.floor(radix)
        if radix < 2 or radix > 36 then
            error("toString() radix argument must be between 2 and 36", 0)
        end
        local integer, fraction = __TS__MathModf(math.abs(self))
        local result = ""
        if radix == 8 then
            result = string.format("%o", integer)
        elseif radix == 16 then
            result = string.format("%x", integer)
        else
            repeat
                do
                    result = __TS__StringAccess(radixChars, integer % radix) .. result
                    integer = math.floor(integer / radix)
                end
            until not (integer ~= 0)
        end
        if fraction ~= 0 then
            result = result .. "."
            local delta = 1e-16
            repeat
                do
                    fraction = fraction * radix
                    delta = delta * radix
                    local digit = math.floor(fraction)
                    result = result .. __TS__StringAccess(radixChars, digit)
                    fraction = fraction - digit
                end
            until not (fraction >= delta)
        end
        if self < 0 then
            result = "-" .. result
        end
        return result
    end
end

local function __TS__NumberToFixed(self, fractionDigits)
    if math.abs(self) >= 1e+21 or self ~= self then
        return tostring(self)
    end
    local f = math.floor(fractionDigits or 0)
    if f < 0 or f > 99 then
        error("toFixed() digits argument must be between 0 and 99", 0)
    end
    return string.format(
        ("%." .. tostring(f)) .. "f",
        self
    )
end

local function __TS__ObjectDefineProperty(target, key, desc)
    local luaKey = type(key) == "number" and key + 1 or key
    local value = rawget(target, luaKey)
    local hasGetterOrSetter = desc.get ~= nil or desc.set ~= nil
    local descriptor
    if hasGetterOrSetter then
        if value ~= nil then
            error(
                "Cannot redefine property: " .. tostring(key),
                0
            )
        end
        descriptor = desc
    else
        local valueExists = value ~= nil
        local ____desc_set_4 = desc.set
        local ____desc_get_5 = desc.get
        local ____desc_configurable_0 = desc.configurable
        if ____desc_configurable_0 == nil then
            ____desc_configurable_0 = valueExists
        end
        local ____desc_enumerable_1 = desc.enumerable
        if ____desc_enumerable_1 == nil then
            ____desc_enumerable_1 = valueExists
        end
        local ____desc_writable_2 = desc.writable
        if ____desc_writable_2 == nil then
            ____desc_writable_2 = valueExists
        end
        local ____temp_3
        if desc.value ~= nil then
            ____temp_3 = desc.value
        else
            ____temp_3 = value
        end
        descriptor = {
            set = ____desc_set_4,
            get = ____desc_get_5,
            configurable = ____desc_configurable_0,
            enumerable = ____desc_enumerable_1,
            writable = ____desc_writable_2,
            value = ____temp_3
        }
    end
    __TS__SetDescriptor(target, luaKey, descriptor)
    return target
end

local function __TS__ObjectEntries(obj)
    local result = {}
    local len = 0
    for key in pairs(obj) do
        len = len + 1
        result[len] = {key, obj[key]}
    end
    return result
end

local function __TS__ObjectFromEntries(entries)
    local obj = {}
    local iterable = entries
    if iterable[Symbol.iterator] then
        local iterator = iterable[Symbol.iterator](iterable)
        while true do
            local result = iterator:next()
            if result.done then
                break
            end
            local value = result.value
            obj[value[1]] = value[2]
        end
    else
        for ____, entry in ipairs(entries) do
            obj[entry[1]] = entry[2]
        end
    end
    return obj
end

local function __TS__ObjectGroupBy(items, keySelector)
    local result = {}
    local i = 0
    for ____, item in __TS__Iterator(items) do
        local key = keySelector(nil, item, i)
        if result[key] ~= nil then
            local ____result_key_0 = result[key]
            ____result_key_0[#____result_key_0 + 1] = item
        else
            result[key] = {item}
        end
        i = i + 1
    end
    return result
end

local function __TS__ObjectKeys(obj)
    local result = {}
    local len = 0
    for key in pairs(obj) do
        len = len + 1
        result[len] = key
    end
    return result
end

local function __TS__ObjectRest(target, usedProperties)
    local result = {}
    for property in pairs(target) do
        if not usedProperties[property] then
            result[property] = target[property]
        end
    end
    return result
end

local function __TS__ObjectValues(obj)
    local result = {}
    local len = 0
    for key in pairs(obj) do
        len = len + 1
        result[len] = obj[key]
    end
    return result
end

local function __TS__PromiseAll(iterable)
    local results = {}
    local toResolve = {}
    local numToResolve = 0
    local i = 0
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == 1 then
                results[i + 1] = item.value
            elseif item.state == 2 then
                return __TS__Promise.reject(item.rejectionReason)
            else
                numToResolve = numToResolve + 1
                toResolve[i] = item
            end
        else
            results[i + 1] = item
        end
        i = i + 1
    end
    if numToResolve == 0 then
        return __TS__Promise.resolve(results)
    end
    return __TS__New(
        __TS__Promise,
        function(____, resolve, reject)
            for index, promise in pairs(toResolve) do
                promise["then"](
                    promise,
                    function(____, data)
                        results[index + 1] = data
                        numToResolve = numToResolve - 1
                        if numToResolve == 0 then
                            resolve(nil, results)
                        end
                    end,
                    function(____, reason)
                        reject(nil, reason)
                    end
                )
            end
        end
    )
end

local function __TS__PromiseAllSettled(iterable)
    local results = {}
    local toResolve = {}
    local numToResolve = 0
    local i = 0
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == 1 then
                results[i + 1] = {status = "fulfilled", value = item.value}
            elseif item.state == 2 then
                results[i + 1] = {status = "rejected", reason = item.rejectionReason}
            else
                numToResolve = numToResolve + 1
                toResolve[i] = item
            end
        else
            results[i + 1] = {status = "fulfilled", value = item}
        end
        i = i + 1
    end
    if numToResolve == 0 then
        return __TS__Promise.resolve(results)
    end
    return __TS__New(
        __TS__Promise,
        function(____, resolve)
            for index, promise in pairs(toResolve) do
                promise["then"](
                    promise,
                    function(____, data)
                        results[index + 1] = {status = "fulfilled", value = data}
                        numToResolve = numToResolve - 1
                        if numToResolve == 0 then
                            resolve(nil, results)
                        end
                    end,
                    function(____, reason)
                        results[index + 1] = {status = "rejected", reason = reason}
                        numToResolve = numToResolve - 1
                        if numToResolve == 0 then
                            resolve(nil, results)
                        end
                    end
                )
            end
        end
    )
end

local function __TS__PromiseAny(iterable)
    local rejections = {}
    local pending = {}
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == 1 then
                return __TS__Promise.resolve(item.value)
            elseif item.state == 2 then
                rejections[#rejections + 1] = item.rejectionReason
            else
                pending[#pending + 1] = item
            end
        else
            return __TS__Promise.resolve(item)
        end
    end
    if #pending == 0 then
        return __TS__Promise.reject("No promises to resolve with .any()")
    end
    local numResolved = 0
    return __TS__New(
        __TS__Promise,
        function(____, resolve, reject)
            for ____, promise in ipairs(pending) do
                promise["then"](
                    promise,
                    function(____, data)
                        resolve(nil, data)
                    end,
                    function(____, reason)
                        rejections[#rejections + 1] = reason
                        numResolved = numResolved + 1
                        if numResolved == #pending then
                            reject(nil, {name = "AggregateError", message = "All Promises rejected", errors = rejections})
                        end
                    end
                )
            end
        end
    )
end

local function __TS__PromiseRace(iterable)
    local pending = {}
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == 1 then
                return __TS__Promise.resolve(item.value)
            elseif item.state == 2 then
                return __TS__Promise.reject(item.rejectionReason)
            else
                pending[#pending + 1] = item
            end
        else
            return __TS__Promise.resolve(item)
        end
    end
    return __TS__New(
        __TS__Promise,
        function(____, resolve, reject)
            for ____, promise in ipairs(pending) do
                promise["then"](
                    promise,
                    function(____, value) return resolve(nil, value) end,
                    function(____, reason) return reject(nil, reason) end
                )
            end
        end
    )
end

local Set
do
    Set = __TS__Class()
    Set.name = "Set"
    function Set.prototype.____constructor(self, values)
        self[Symbol.toStringTag] = "Set"
        self.size = 0
        self.nextKey = {}
        self.previousKey = {}
        if values == nil then
            return
        end
        local iterable = values
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                self:add(result.value)
            end
        else
            local array = values
            for ____, value in ipairs(array) do
                self:add(value)
            end
        end
    end
    function Set.prototype.add(self, value)
        local isNewValue = not self:has(value)
        if isNewValue then
            self.size = self.size + 1
        end
        if self.firstKey == nil then
            self.firstKey = value
            self.lastKey = value
        elseif isNewValue then
            self.nextKey[self.lastKey] = value
            self.previousKey[value] = self.lastKey
            self.lastKey = value
        end
        return self
    end
    function Set.prototype.clear(self)
        self.nextKey = {}
        self.previousKey = {}
        self.firstKey = nil
        self.lastKey = nil
        self.size = 0
    end
    function Set.prototype.delete(self, value)
        local contains = self:has(value)
        if contains then
            self.size = self.size - 1
            local next = self.nextKey[value]
            local previous = self.previousKey[value]
            if next ~= nil and previous ~= nil then
                self.nextKey[previous] = next
                self.previousKey[next] = previous
            elseif next ~= nil then
                self.firstKey = next
                self.previousKey[next] = nil
            elseif previous ~= nil then
                self.lastKey = previous
                self.nextKey[previous] = nil
            else
                self.firstKey = nil
                self.lastKey = nil
            end
            self.nextKey[value] = nil
            self.previousKey[value] = nil
        end
        return contains
    end
    function Set.prototype.forEach(self, callback)
        for ____, key in __TS__Iterator(self:keys()) do
            callback(nil, key, key, self)
        end
    end
    function Set.prototype.has(self, value)
        return self.nextKey[value] ~= nil or self.lastKey == value
    end
    Set.prototype[Symbol.iterator] = function(self)
        return self:values()
    end
    function Set.prototype.entries(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = {key, key}}
                key = nextKey[key]
                return result
            end
        }
    end
    function Set.prototype.keys(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    function Set.prototype.values(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    function Set.prototype.union(self, other)
        local result = __TS__New(Set, self)
        for ____, item in __TS__Iterator(other) do
            result:add(item)
        end
        return result
    end
    function Set.prototype.intersection(self, other)
        local result = __TS__New(Set)
        for ____, item in __TS__Iterator(self) do
            if other:has(item) then
                result:add(item)
            end
        end
        return result
    end
    function Set.prototype.difference(self, other)
        local result = __TS__New(Set, self)
        for ____, item in __TS__Iterator(other) do
            result:delete(item)
        end
        return result
    end
    function Set.prototype.symmetricDifference(self, other)
        local result = __TS__New(Set, self)
        for ____, item in __TS__Iterator(other) do
            if self:has(item) then
                result:delete(item)
            else
                result:add(item)
            end
        end
        return result
    end
    function Set.prototype.isSubsetOf(self, other)
        for ____, item in __TS__Iterator(self) do
            if not other:has(item) then
                return false
            end
        end
        return true
    end
    function Set.prototype.isSupersetOf(self, other)
        for ____, item in __TS__Iterator(other) do
            if not self:has(item) then
                return false
            end
        end
        return true
    end
    function Set.prototype.isDisjointFrom(self, other)
        for ____, item in __TS__Iterator(self) do
            if other:has(item) then
                return false
            end
        end
        return true
    end
    Set[Symbol.species] = Set
end

local function __TS__SparseArrayNew(...)
    local sparseArray = {...}
    sparseArray.sparseLength = __TS__CountVarargs(...)
    return sparseArray
end

local function __TS__SparseArrayPush(sparseArray, ...)
    local args = {...}
    local argsLen = __TS__CountVarargs(...)
    local listLen = sparseArray.sparseLength
    for i = 1, argsLen do
        sparseArray[listLen + i] = args[i]
    end
    sparseArray.sparseLength = listLen + argsLen
end

local function __TS__SparseArraySpread(sparseArray)
    local _unpack = unpack or table.unpack
    return _unpack(sparseArray, 1, sparseArray.sparseLength)
end

local WeakMap
do
    WeakMap = __TS__Class()
    WeakMap.name = "WeakMap"
    function WeakMap.prototype.____constructor(self, entries)
        self[Symbol.toStringTag] = "WeakMap"
        self.items = {}
        setmetatable(self.items, {__mode = "k"})
        if entries == nil then
            return
        end
        local iterable = entries
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                local value = result.value
                self.items[value[1]] = value[2]
            end
        else
            for ____, kvp in ipairs(entries) do
                self.items[kvp[1]] = kvp[2]
            end
        end
    end
    function WeakMap.prototype.delete(self, key)
        local contains = self:has(key)
        self.items[key] = nil
        return contains
    end
    function WeakMap.prototype.get(self, key)
        return self.items[key]
    end
    function WeakMap.prototype.has(self, key)
        return self.items[key] ~= nil
    end
    function WeakMap.prototype.set(self, key, value)
        self.items[key] = value
        return self
    end
    WeakMap[Symbol.species] = WeakMap
end

local WeakSet
do
    WeakSet = __TS__Class()
    WeakSet.name = "WeakSet"
    function WeakSet.prototype.____constructor(self, values)
        self[Symbol.toStringTag] = "WeakSet"
        self.items = {}
        setmetatable(self.items, {__mode = "k"})
        if values == nil then
            return
        end
        local iterable = values
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                self.items[result.value] = true
            end
        else
            for ____, value in ipairs(values) do
                self.items[value] = true
            end
        end
    end
    function WeakSet.prototype.add(self, value)
        self.items[value] = true
        return self
    end
    function WeakSet.prototype.delete(self, value)
        local contains = self:has(value)
        self.items[value] = nil
        return contains
    end
    function WeakSet.prototype.has(self, value)
        return self.items[value] == true
    end
    WeakSet[Symbol.species] = WeakSet
end

local function __TS__SourceMapTraceBack(fileName, sourceMap)
    _G.__TS__sourcemap = _G.__TS__sourcemap or ({})
    _G.__TS__sourcemap[fileName] = sourceMap
    if _G.__TS__originalTraceback == nil then
        local originalTraceback = debug.traceback
        _G.__TS__originalTraceback = originalTraceback
        debug.traceback = function(thread, message, level)
            local trace
            if thread == nil and message == nil and level == nil then
                trace = originalTraceback()
            elseif __TS__StringIncludes(_VERSION, "Lua 5.0") then
                trace = originalTraceback((("[Level " .. tostring(level)) .. "] ") .. tostring(message))
            else
                trace = originalTraceback(thread, message, level)
            end
            if type(trace) ~= "string" then
                return trace
            end
            local function replacer(____, file, srcFile, line)
                local fileSourceMap = _G.__TS__sourcemap[file]
                if fileSourceMap ~= nil and fileSourceMap[line] ~= nil then
                    local data = fileSourceMap[line]
                    if type(data) == "number" then
                        return (srcFile .. ":") .. tostring(data)
                    end
                    return (data.file .. ":") .. tostring(data.line)
                end
                return (file .. ":") .. line
            end
            local result = string.gsub(
                trace,
                "(%S+)%.lua:(%d+)",
                function(file, line) return replacer(nil, file .. ".lua", file .. ".ts", line) end
            )
            local function stringReplacer(____, file, line)
                local fileSourceMap = _G.__TS__sourcemap[file]
                if fileSourceMap ~= nil and fileSourceMap[line] ~= nil then
                    local chunkName = (__TS__Match(file, "%[string \"([^\"]+)\"%]"))
                    local sourceName = string.gsub(chunkName, ".lua$", ".ts")
                    local data = fileSourceMap[line]
                    if type(data) == "number" then
                        return (sourceName .. ":") .. tostring(data)
                    end
                    return (data.file .. ":") .. tostring(data.line)
                end
                return (file .. ":") .. line
            end
            result = string.gsub(
                result,
                "(%[string \"[^\"]+\"%]):(%d+)",
                function(file, line) return stringReplacer(nil, file, line) end
            )
            return result
        end
    end
end

local function __TS__Spread(iterable)
    local arr = {}
    if type(iterable) == "string" then
        for i = 0, #iterable - 1 do
            arr[i + 1] = __TS__StringAccess(iterable, i)
        end
    else
        local len = 0
        for ____, item in __TS__Iterator(iterable) do
            len = len + 1
            arr[len] = item
        end
    end
    return __TS__Unpack(arr)
end

local function __TS__StringCharAt(self, pos)
    if pos ~= pos then
        pos = 0
    end
    if pos < 0 then
        return ""
    end
    return string.sub(self, pos + 1, pos + 1)
end

local function __TS__StringCharCodeAt(self, index)
    if index ~= index then
        index = 0
    end
    if index < 0 then
        return 0 / 0
    end
    return string.byte(self, index + 1) or 0 / 0
end

local function __TS__StringEndsWith(self, searchString, endPosition)
    if endPosition == nil or endPosition > #self then
        endPosition = #self
    end
    return string.sub(self, endPosition - #searchString + 1, endPosition) == searchString
end

local function __TS__StringPadEnd(self, maxLength, fillString)
    if fillString == nil then
        fillString = " "
    end
    if maxLength ~= maxLength then
        maxLength = 0
    end
    if maxLength == -math.huge or maxLength == math.huge then
        error("Invalid string length", 0)
    end
    if #self >= maxLength or #fillString == 0 then
        return self
    end
    maxLength = maxLength - #self
    if maxLength > #fillString then
        fillString = fillString .. string.rep(
            fillString,
            math.floor(maxLength / #fillString)
        )
    end
    return self .. string.sub(
        fillString,
        1,
        math.floor(maxLength)
    )
end

local function __TS__StringPadStart(self, maxLength, fillString)
    if fillString == nil then
        fillString = " "
    end
    if maxLength ~= maxLength then
        maxLength = 0
    end
    if maxLength == -math.huge or maxLength == math.huge then
        error("Invalid string length", 0)
    end
    if #self >= maxLength or #fillString == 0 then
        return self
    end
    maxLength = maxLength - #self
    if maxLength > #fillString then
        fillString = fillString .. string.rep(
            fillString,
            math.floor(maxLength / #fillString)
        )
    end
    return string.sub(
        fillString,
        1,
        math.floor(maxLength)
    ) .. self
end

local __TS__StringReplace
do
    local sub = string.sub
    function __TS__StringReplace(source, searchValue, replaceValue)
        local startPos, endPos = string.find(source, searchValue, nil, true)
        if not startPos then
            return source
        end
        local before = sub(source, 1, startPos - 1)
        local replacement = type(replaceValue) == "string" and replaceValue or replaceValue(nil, searchValue, startPos - 1, source)
        local after = sub(source, endPos + 1)
        return (before .. replacement) .. after
    end
end

local __TS__StringSplit
do
    local sub = string.sub
    local find = string.find
    function __TS__StringSplit(source, separator, limit)
        if limit == nil then
            limit = 4294967295
        end
        if limit == 0 then
            return {}
        end
        local result = {}
        local resultIndex = 1
        if separator == nil or separator == "" then
            for i = 1, #source do
                result[resultIndex] = sub(source, i, i)
                resultIndex = resultIndex + 1
            end
        else
            local currentPos = 1
            while resultIndex <= limit do
                local startPos, endPos = find(source, separator, currentPos, true)
                if not startPos then
                    break
                end
                result[resultIndex] = sub(source, currentPos, startPos - 1)
                resultIndex = resultIndex + 1
                currentPos = endPos + 1
            end
            if resultIndex <= limit then
                result[resultIndex] = sub(source, currentPos)
            end
        end
        return result
    end
end

local __TS__StringReplaceAll
do
    local sub = string.sub
    local find = string.find
    function __TS__StringReplaceAll(source, searchValue, replaceValue)
        if type(replaceValue) == "string" then
            local concat = table.concat(
                __TS__StringSplit(source, searchValue),
                replaceValue
            )
            if #searchValue == 0 then
                return (replaceValue .. concat) .. replaceValue
            end
            return concat
        end
        local parts = {}
        local partsIndex = 1
        if #searchValue == 0 then
            parts[1] = replaceValue(nil, "", 0, source)
            partsIndex = 2
            for i = 1, #source do
                parts[partsIndex] = sub(source, i, i)
                parts[partsIndex + 1] = replaceValue(nil, "", i, source)
                partsIndex = partsIndex + 2
            end
        else
            local currentPos = 1
            while true do
                local startPos, endPos = find(source, searchValue, currentPos, true)
                if not startPos then
                    break
                end
                parts[partsIndex] = sub(source, currentPos, startPos - 1)
                parts[partsIndex + 1] = replaceValue(nil, searchValue, startPos - 1, source)
                partsIndex = partsIndex + 2
                currentPos = endPos + 1
            end
            parts[partsIndex] = sub(source, currentPos)
        end
        return table.concat(parts)
    end
end

local function __TS__StringSlice(self, start, ____end)
    if start == nil or start ~= start then
        start = 0
    end
    if ____end ~= ____end then
        ____end = 0
    end
    if start >= 0 then
        start = start + 1
    end
    if ____end ~= nil and ____end < 0 then
        ____end = ____end - 1
    end
    return string.sub(self, start, ____end)
end

local function __TS__StringStartsWith(self, searchString, position)
    if position == nil or position < 0 then
        position = 0
    end
    return string.sub(self, position + 1, #searchString + position) == searchString
end

local function __TS__StringSubstr(self, from, length)
    if from ~= from then
        from = 0
    end
    if length ~= nil then
        if length ~= length or length <= 0 then
            return ""
        end
        length = length + from
    end
    if from >= 0 then
        from = from + 1
    end
    return string.sub(self, from, length)
end

local function __TS__StringTrim(self)
    local result = string.gsub(self, "^[%s ﻿]*(.-)[%s ﻿]*$", "%1")
    return result
end

local function __TS__StringTrimEnd(self)
    local result = string.gsub(self, "[%s ﻿]*$", "")
    return result
end

local function __TS__StringTrimStart(self)
    local result = string.gsub(self, "^[%s ﻿]*", "")
    return result
end

local __TS__SymbolRegistryFor, __TS__SymbolRegistryKeyFor
do
    local symbolRegistry = {}
    function __TS__SymbolRegistryFor(key)
        if not symbolRegistry[key] then
            symbolRegistry[key] = __TS__Symbol(key)
        end
        return symbolRegistry[key]
    end
    function __TS__SymbolRegistryKeyFor(sym)
        for key in pairs(symbolRegistry) do
            if symbolRegistry[key] == sym then
                return key
            end
        end
        return nil
    end
end

local function __TS__TypeOf(value)
    local luaType = type(value)
    if luaType == "table" then
        return "object"
    elseif luaType == "nil" then
        return "undefined"
    else
        return luaType
    end
end

local function __TS__Using(self, cb, ...)
    local args = {...}
    local thrownError
    local ok, result = xpcall(
        function() return cb(__TS__Unpack(args)) end,
        function(err)
            thrownError = err
            return thrownError
        end
    )
    local argArray = {__TS__Unpack(args)}
    do
        local i = #argArray - 1
        while i >= 0 do
            local ____self_0 = argArray[i + 1]
            ____self_0[Symbol.dispose](____self_0)
            i = i - 1
        end
    end
    if not ok then
        error(thrownError, 0)
    end
    return result
end

local function __TS__UsingAsync(self, cb, ...)
    local args = {...}
    return __TS__AsyncAwaiter(function(____awaiter_resolve)
        local thrownError
        local ok, result = xpcall(
            function() return cb(
                nil,
                __TS__Unpack(args)
            ) end,
            function(err)
                thrownError = err
                return thrownError
            end
        )
        local argArray = {__TS__Unpack(args)}
        do
            local i = #argArray - 1
            while i >= 0 do
                if argArray[i + 1][Symbol.dispose] ~= nil then
                    local ____self_0 = argArray[i + 1]
                    ____self_0[Symbol.dispose](____self_0)
                end
                if argArray[i + 1][Symbol.asyncDispose] ~= nil then
                    local ____self_1 = argArray[i + 1]
                    __TS__Await(____self_1[Symbol.asyncDispose](____self_1))
                end
                i = i - 1
            end
        end
        if not ok then
            error(thrownError, 0)
        end
        return ____awaiter_resolve(nil, result)
    end)
end

return {
  __TS__ArrayAt = __TS__ArrayAt,
  __TS__ArrayConcat = __TS__ArrayConcat,
  __TS__ArrayEntries = __TS__ArrayEntries,
  __TS__ArrayEvery = __TS__ArrayEvery,
  __TS__ArrayFill = __TS__ArrayFill,
  __TS__ArrayFilter = __TS__ArrayFilter,
  __TS__ArrayForEach = __TS__ArrayForEach,
  __TS__ArrayFind = __TS__ArrayFind,
  __TS__ArrayFindIndex = __TS__ArrayFindIndex,
  __TS__ArrayFrom = __TS__ArrayFrom,
  __TS__ArrayIncludes = __TS__ArrayIncludes,
  __TS__ArrayIndexOf = __TS__ArrayIndexOf,
  __TS__ArrayIsArray = __TS__ArrayIsArray,
  __TS__ArrayJoin = __TS__ArrayJoin,
  __TS__ArrayMap = __TS__ArrayMap,
  __TS__ArrayPush = __TS__ArrayPush,
  __TS__ArrayPushArray = __TS__ArrayPushArray,
  __TS__ArrayReduce = __TS__ArrayReduce,
  __TS__ArrayReduceRight = __TS__ArrayReduceRight,
  __TS__ArrayReverse = __TS__ArrayReverse,
  __TS__ArrayUnshift = __TS__ArrayUnshift,
  __TS__ArraySort = __TS__ArraySort,
  __TS__ArraySlice = __TS__ArraySlice,
  __TS__ArraySome = __TS__ArraySome,
  __TS__ArraySplice = __TS__ArraySplice,
  __TS__ArrayToObject = __TS__ArrayToObject,
  __TS__ArrayFlat = __TS__ArrayFlat,
  __TS__ArrayFlatMap = __TS__ArrayFlatMap,
  __TS__ArraySetLength = __TS__ArraySetLength,
  __TS__ArrayToReversed = __TS__ArrayToReversed,
  __TS__ArrayToSorted = __TS__ArrayToSorted,
  __TS__ArrayToSpliced = __TS__ArrayToSpliced,
  __TS__ArrayWith = __TS__ArrayWith,
  __TS__AsyncAwaiter = __TS__AsyncAwaiter,
  __TS__Await = __TS__Await,
  __TS__Class = __TS__Class,
  __TS__ClassExtends = __TS__ClassExtends,
  __TS__CloneDescriptor = __TS__CloneDescriptor,
  __TS__CountVarargs = __TS__CountVarargs,
  __TS__Decorate = __TS__Decorate,
  __TS__DecorateLegacy = __TS__DecorateLegacy,
  __TS__DecorateParam = __TS__DecorateParam,
  __TS__Delete = __TS__Delete,
  __TS__DelegatedYield = __TS__DelegatedYield,
  __TS__DescriptorGet = __TS__DescriptorGet,
  __TS__DescriptorSet = __TS__DescriptorSet,
  Error = Error,
  RangeError = RangeError,
  ReferenceError = ReferenceError,
  SyntaxError = SyntaxError,
  TypeError = TypeError,
  URIError = URIError,
  __TS__FunctionBind = __TS__FunctionBind,
  __TS__Generator = __TS__Generator,
  __TS__InstanceOf = __TS__InstanceOf,
  __TS__InstanceOfObject = __TS__InstanceOfObject,
  __TS__Iterator = __TS__Iterator,
  __TS__LuaIteratorSpread = __TS__LuaIteratorSpread,
  Map = Map,
  __TS__MapGroupBy = __TS__MapGroupBy,
  __TS__Match = __TS__Match,
  __TS__MathAtan2 = __TS__MathAtan2,
  __TS__MathModf = __TS__MathModf,
  __TS__MathSign = __TS__MathSign,
  __TS__MathTrunc = __TS__MathTrunc,
  __TS__New = __TS__New,
  __TS__Number = __TS__Number,
  __TS__NumberIsFinite = __TS__NumberIsFinite,
  __TS__NumberIsInteger = __TS__NumberIsInteger,
  __TS__NumberIsNaN = __TS__NumberIsNaN,
  __TS__ParseInt = __TS__ParseInt,
  __TS__ParseFloat = __TS__ParseFloat,
  __TS__NumberToString = __TS__NumberToString,
  __TS__NumberToFixed = __TS__NumberToFixed,
  __TS__ObjectAssign = __TS__ObjectAssign,
  __TS__ObjectDefineProperty = __TS__ObjectDefineProperty,
  __TS__ObjectEntries = __TS__ObjectEntries,
  __TS__ObjectFromEntries = __TS__ObjectFromEntries,
  __TS__ObjectGetOwnPropertyDescriptor = __TS__ObjectGetOwnPropertyDescriptor,
  __TS__ObjectGetOwnPropertyDescriptors = __TS__ObjectGetOwnPropertyDescriptors,
  __TS__ObjectGroupBy = __TS__ObjectGroupBy,
  __TS__ObjectKeys = __TS__ObjectKeys,
  __TS__ObjectRest = __TS__ObjectRest,
  __TS__ObjectValues = __TS__ObjectValues,
  __TS__ParseFloat = __TS__ParseFloat,
  __TS__ParseInt = __TS__ParseInt,
  __TS__Promise = __TS__Promise,
  __TS__PromiseAll = __TS__PromiseAll,
  __TS__PromiseAllSettled = __TS__PromiseAllSettled,
  __TS__PromiseAny = __TS__PromiseAny,
  __TS__PromiseRace = __TS__PromiseRace,
  Set = Set,
  __TS__SetDescriptor = __TS__SetDescriptor,
  __TS__SparseArrayNew = __TS__SparseArrayNew,
  __TS__SparseArrayPush = __TS__SparseArrayPush,
  __TS__SparseArraySpread = __TS__SparseArraySpread,
  WeakMap = WeakMap,
  WeakSet = WeakSet,
  __TS__SourceMapTraceBack = __TS__SourceMapTraceBack,
  __TS__Spread = __TS__Spread,
  __TS__StringAccess = __TS__StringAccess,
  __TS__StringCharAt = __TS__StringCharAt,
  __TS__StringCharCodeAt = __TS__StringCharCodeAt,
  __TS__StringEndsWith = __TS__StringEndsWith,
  __TS__StringIncludes = __TS__StringIncludes,
  __TS__StringPadEnd = __TS__StringPadEnd,
  __TS__StringPadStart = __TS__StringPadStart,
  __TS__StringReplace = __TS__StringReplace,
  __TS__StringReplaceAll = __TS__StringReplaceAll,
  __TS__StringSlice = __TS__StringSlice,
  __TS__StringSplit = __TS__StringSplit,
  __TS__StringStartsWith = __TS__StringStartsWith,
  __TS__StringSubstr = __TS__StringSubstr,
  __TS__StringSubstring = __TS__StringSubstring,
  __TS__StringTrim = __TS__StringTrim,
  __TS__StringTrimEnd = __TS__StringTrimEnd,
  __TS__StringTrimStart = __TS__StringTrimStart,
  __TS__Symbol = __TS__Symbol,
  Symbol = Symbol,
  __TS__SymbolRegistryFor = __TS__SymbolRegistryFor,
  __TS__SymbolRegistryKeyFor = __TS__SymbolRegistryKeyFor,
  __TS__TypeOf = __TS__TypeOf,
  __TS__Unpack = __TS__Unpack,
  __TS__Using = __TS__Using,
  __TS__UsingAsync = __TS__UsingAsync
}
 end,
["library.log"] = function(...) 
local ____exports = {}
---
-- @param arguments_
-- @noSelf
-- @example
local function log(...)
    print(...)
end
____exports.default = log
return ____exports
 end,
["library.queue"] = function(...) 
local ____exports = {}
local ____log_2Ets = require("library.log")
local log = ____log_2Ets.default
---
-- @param tasks
-- @param interval
-- @noSelf
-- @example
local function queue(tasks, interval)
    if interval == nil then
        interval = 0
    end
    local initialDelay = 0
    local channel = "other"
    local index = 0
    local scheduleNext
    ---
    -- @param delay
    -- @example
    scheduleNext = function(____, delay)
        local triggerType = delay > 0 and "after" or "immediate"
        G.E_MANAGER:add_event(
            Event({
                blockable = false,
                blocking = false,
                delay = delay,
                func = function()
                    log("TRYING TASK " .. tostring(index))
                    local done = tasks[index + 1](tasks)
                    if done then
                        index = index + 1
                    end
                    if index < #tasks then
                        scheduleNext(nil, interval)
                    end
                    return true
                end,
                no_delete = true,
                trigger = triggerType
            }),
            channel
        )
    end
    scheduleNext(nil, initialDelay)
end
____exports.default = queue
return ____exports
 end,
["library.server.handle-message._common.output_root"] = function(...) 
local ____exports = {}
local output_root = "output/"
____exports.default = output_root
return ____exports
 end,
["library.server.handle-message._common._exports"] = function(...) 
local ____exports = {}
do
    local ____output_root = require("library.server.handle-message._common.output_root")
    ____exports.output_root = ____output_root.default
end
return ____exports
 end,
["library.server.handle-message.exporter.filter-list-from-string"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__StringTrim = ____lualib.__TS__StringTrim
local __TS__StringReplaceAll = ____lualib.__TS__StringReplaceAll
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local ____exports = {}
---
-- @param string
-- @noSelf
-- @example
local function filterListFromString(____string)
    return __TS__ArrayMap(
        __TS__StringSplit(
            __TS__StringReplaceAll(____string, " ", ""),
            ","
        ),
        function(____, item) return __TS__StringTrim(item) end
    )
end
____exports.default = filterListFromString
return ____exports
 end,
["library.server.handle-message.exporter._common.convert-to-hex"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__NumberToString = ____lualib.__TS__NumberToString
local __TS__StringPadStart = ____lualib.__TS__StringPadStart
local ____exports = {}
---
-- @param colourTable
-- @noSelf
-- @example
local function convertToHex(colourTable)
    if not colourTable then
        return
    end
    local r, g, b = unpack(colourTable)
    ---
    -- @param v
    -- @example
    local function toHex(____, v)
        return __TS__StringPadStart(
            __TS__NumberToString(
                math.floor(v * 255 + 0.5),
                16
            ),
            2,
            "0"
        )
    end
    return (("#" .. toHex(nil, r)) .. toHex(nil, g)) .. toHex(nil, b)
end
____exports.default = convertToHex
return ____exports
 end,
["library.server.handle-message.exporter._common.get-description-from-table"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local ____exports = {}
local ____convert_2Dto_2Dhex_2Ets = require("library.server.handle-message.exporter._common.convert-to-hex")
local convertToHex = ____convert_2Dto_2Dhex_2Ets.default
---
-- @param descTable
-- @noSelf
-- @example
local function getDescriptionFromTable(descTable)
    return __TS__ArrayMap(
        descTable,
        function(____, row) return __TS__ArrayMap(
            row,
            function(____, cell)
                local phrase = {}
                if cell.nodes and #cell.nodes > 0 then
                    phrase.text = tostring(cell.nodes[1].config.text)
                    phrase.colour = convertToHex(cell.nodes[1].config.colour)
                    phrase.background_colour = convertToHex(cell.config.colour)
                else
                    phrase.text = tostring(cell.config.text)
                    phrase.colour = convertToHex(cell.config.colour)
                end
                return phrase
            end
        ) end
    )
end
____exports.default = getDescriptionFromTable
return ____exports
 end,
["library.server.handle-message.exporter._common.get-name-from-table"] = function(...) 
local ____exports = {}
---
-- @param tableData
-- @noSelf
-- @example
local function getNameFromTable(tableData)
    local name = ""
    for ____, cell in ipairs(tableData) do
        local ____temp_2 = cell.nodes ~= nil
        if ____temp_2 then
            local ____opt_0 = cell.nodes[1]
            ____temp_2 = (____opt_0 and ____opt_0.config.object) ~= nil
        end
        if ____temp_2 then
            for ____, ____value in ipairs(cell.nodes[1].config.object.strings) do
                local ____string = ____value.string
                name = name .. tostring(____string)
            end
        else
            local ____temp_5 = cell.nodes ~= nil
            if ____temp_5 then
                local ____opt_3 = cell.nodes[1]
                ____temp_5 = (____opt_3 and ____opt_3.config.text) ~= nil
            end
            if ____temp_5 then
                name = name .. tostring(cell.nodes[1].config.text)
            elseif cell.config.object == nil then
                name = name .. tostring(cell.config.text)
            else
                for ____, ____value in ipairs(cell.config.object.strings) do
                    local ____string = ____value.string
                    name = name .. tostring(____string)
                end
            end
        end
    end
    return name
end
____exports.default = getNameFromTable
return ____exports
 end,
["library.server.handle-message.exporter._common.output-image"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__StringReplaceAll = ____lualib.__TS__StringReplaceAll
local __TS__ArrayEntries = ____lualib.__TS__ArrayEntries
local __TS__Iterator = ____lualib.__TS__Iterator
local ____exports = {}
local ____output_root_2Ets = require("library.server.handle-message._common.output_root")
local output_root = ____output_root_2Ets.default
local outputImages = true
local COLOR_WHITE = 255
--- Creates animation frames from a single row in the atlas.
-- 
-- @param card - The card with only pos.y defined.
-- @param atlasData - The full sprite-sheet ImageData.
-- @param regionW - Width of one frame in pixels.
-- @param regionH - Height of one frame in pixels.
-- @returns Array of ImageData frames.
-- @noSelf
local function createAnimationFrames(card, atlasData, regionW, regionH)
    local rowY = math.floor(card.pos.y * regionH + 0.5)
    local sheetW = atlasData:getWidth()
    local frameCount = math.floor(sheetW / regionW)
    local frames = {}
    do
        local index = 0
        while index < frameCount do
            local frame = love.image.newImageData(regionW, regionH)
            frame:paste(
                atlasData,
                0,
                0,
                index * regionW,
                rowY,
                regionW,
                regionH
            )
            frames[#frames + 1] = frame
            index = index + 1
        end
    end
    return frames
end
--- Assigns the atlas property to the card if it is missing and set is defined.
-- 
-- @param card - The card object to assign the atlas to.
-- @noSelf
local function assignAtlasIfNeeded(card)
    if not card.atlas and card.set ~= nil then
        card.atlas = card.set
    end
end
--- Ensures that the atlas image data is loaded for the given card.
-- 
-- @param card - The card object to check and load atlas image data for.
-- @param options0 - The root object
-- @param options0.atlasGroup - The root object
-- @noSelf
local function ensureAtlasImageData(card, ____bindingPattern0)
    local atlasGroup
    atlasGroup = ____bindingPattern0.atlasGroup
    if outputImages and (atlasGroup and atlasGroup[card.atlas]) and atlasGroup[card.atlas].image_data == nil then
        local ____TS__ArrayFind_result_2 = __TS__ArrayFind(
            G.asset_atli,
            function(____, item) return item.name == card.set or item.name == "tags" and card.set == "Tag" or item.name == "centers" and card.set == "Enhanced" or item.name == "blind_chips" and card.set == "Blind" or item.name == "cards_1" and card.atlas == "cards_1" end
        )
        if ____TS__ArrayFind_result_2 == nil then
            ____TS__ArrayFind_result_2 = __TS__ArrayFind(
                G.animation_atli,
                function(____, item) return item.name == card.set or item.name == "tags" and card.set == "Tag" or item.name == "centers" and card.set == "Enhanced" or item.name == "blind_chips" and card.set == "Blind" or item.name == "cards_1" and card.atlas == "cards_1" end
            )
        end
        local atlasItem = ____TS__ArrayFind_result_2
        if atlasItem == nil then
            print("Atlas item not found for card: " .. card.key)
            print(tprint(card))
            return
        end
        atlasGroup[card.atlas].image_data = love.image.newImageData(atlasItem.path)
    end
end
--- Retrieves the atlas image data for the given card, ensuring it is loaded.
-- 
-- @param card - The card object for which to retrieve the atlas image data.
-- @param options0 - The root object
-- @param options0.atlasGroup - The root object
-- @noSelf
local function getAtlasData(card, ____bindingPattern0)
    local atlasGroup
    atlasGroup = ____bindingPattern0.atlasGroup
    ensureAtlasImageData(card, {atlasGroup = atlasGroup})
    local ____opt_3 = atlasGroup and atlasGroup[card.atlas]
    if ____opt_3 ~= nil then
        ____opt_3 = ____opt_3.image_data
    end
    return ____opt_3
end
--- Calculates the logical and region dimensions for the given card.
-- 
-- @param card - The card object for which to calculate dimensions.
-- @param options0 - The root object
-- @param options0.atlasGroup - The root object
-- @noSelf
local function getLogicalAndRegion(card, ____bindingPattern0)
    local atlasGroup
    atlasGroup = ____bindingPattern0.atlasGroup
    local atlasScale = G.SETTINGS.GRAPHICS.texture_scaling
    local logicalW = atlasGroup[card.atlas].px
    local logicalH = atlasGroup[card.atlas].py
    local regionW = math.floor(logicalW * atlasScale + 0.5)
    local regionH = math.floor(logicalH * atlasScale + 0.5)
    return {logicalH = logicalH, logicalW = logicalW, regionH = regionH, regionW = regionW}
end
--- Saves the provided image data as a PNG file at the specified file path.
-- 
-- @param imageData - The image data to save as a PNG.
-- @param filePath - The file path where the PNG should be saved.
-- @noSelf
local function saveImageData(imageData, filePath)
    if love.filesystem.getInfo(filePath) then
        love.filesystem.remove(filePath)
    end
    imageData:encode("png", filePath)
end
--- Creates image data for a card from the atlas.
-- 
-- @param card - The card object containing position metadata.
-- @param atlasData - The source atlas image data.
-- @param regionW - The width of the region to extract.
-- @param regionH - The height of the region to extract.
-- @noSelf
local function createImageData(card, atlasData, regionW, regionH)
    local sourceX = math.floor((card.pos.x or 0) * regionW + 0.5)
    local sourceY = math.floor((card.pos.y or 0) * regionH + 0.5)
    local imageData = love.image.newImageData(regionW, regionH)
    imageData:paste(
        atlasData,
        0,
        0,
        sourceX,
        sourceY,
        regionW,
        regionH
    )
    return imageData
end
--- Creates extra image data for a card if soul_pos.extra is present.
-- 
-- @param card - The card object containing soul_pos.extra metadata.
-- @param atlasData - The source atlas image data.
-- @param regionW - The width of the region to extract.
-- @param regionH - The height of the region to extract.
-- @noSelf
local function createExtraData(card, atlasData, regionW, regionH)
    local ____opt_7 = card.soul_pos
    if ____opt_7 and ____opt_7.extra then
        local extraImageData = love.image.newImageData(regionW, regionH)
        extraImageData:paste(
            atlasData,
            0,
            0,
            math.floor(card.soul_pos.extra.x * regionW + 0.5),
            math.floor(card.soul_pos.extra.y * regionH + 0.5),
            regionW,
            regionH
        )
        return extraImageData
    end
end
--- Creates soul image data for a card if soul_pos is present.
-- 
-- @param card - The card object containing soul_pos metadata.
-- @param atlasData - The source atlas image data.
-- @param regionW - The width of the region to extract.
-- @param regionH - The height of the region to extract.
-- @noSelf
local function createSoulData(card, atlasData, regionW, regionH)
    if card.soul_pos then
        local soulImageData = love.image.newImageData(regionW, regionH)
        soulImageData:paste(
            atlasData,
            0,
            0,
            math.floor(card.soul_pos.x * regionW + 0.5),
            math.floor(card.soul_pos.y * regionH + 0.5),
            regionW,
            regionH
        )
        return soulImageData
    end
end
--- Draws the main, extra, and soul image data to a canvas and returns the result.
-- 
-- @param options - The options for drawing to the canvas.
-- @param options.imageData - The main image data to draw.
-- @param options.extraData - The extra image data to overlay.
-- @param options.soulData - The soul image data to overlay.
-- @param options.regionW - The width of the canvas.
-- @param options.regionH - The height of the canvas.
-- @noSelf
local function drawToCanvas(____bindingPattern0)
    local soulData
    local regionW
    local regionH
    local imageData
    local extraData
    extraData = ____bindingPattern0.extraData
    imageData = ____bindingPattern0.imageData
    regionH = ____bindingPattern0.regionH
    regionW = ____bindingPattern0.regionW
    soulData = ____bindingPattern0.soulData
    love.graphics.push()
    local previousCanvas = {love.graphics.getCanvas()}
    local canvas = love.graphics.newCanvas(regionW, regionH, {dpiscale = 1, readable = true, type = "2d"})
    love.graphics.setCanvas(canvas)
    love.graphics.clear(0, 0, 0, 0)
    love.graphics.setColor(COLOR_WHITE, COLOR_WHITE, COLOR_WHITE, COLOR_WHITE)
    love.graphics.setBlendMode("alpha", "premultiplied")
    love.graphics.draw(
        love.graphics.newImage(imageData),
        0,
        0
    )
    love.graphics.setBlendMode("alpha")
    if extraData then
        love.graphics.setBlendMode("alpha", "premultiplied")
        love.graphics.draw(
            love.graphics.newImage(extraData),
            0,
            0
        )
        love.graphics.setBlendMode("alpha")
    end
    if soulData then
        love.graphics.setBlendMode("alpha", "premultiplied")
        love.graphics.draw(
            love.graphics.newImage(soulData),
            0,
            0
        )
        love.graphics.setBlendMode("alpha")
    end
    love.graphics.setCanvas(previousCanvas)
    love.graphics.pop()
    return canvas:newImageData()
end
--- Resizes the given image data to the logical width and height.
-- 
-- @param imageData - The image data to resize.
-- @param logicalW - The target logical width.
-- @param logicalH - The target logical height.
-- @noSelf
local function resizeImageData(imageData, logicalW, logicalH)
    local outCanvas = love.graphics.newCanvas(logicalW, logicalH, {dpiscale = 1, readable = true, type = "2d"})
    love.graphics.push()
    local previousCanvas = {love.graphics.getCanvas()}
    love.graphics.setCanvas(outCanvas)
    love.graphics.clear(0, 0, 0, 0)
    love.graphics.setColor(COLOR_WHITE, COLOR_WHITE, COLOR_WHITE, COLOR_WHITE)
    local img = love.graphics.newImage(imageData)
    img:setFilter("nearest", "nearest")
    love.graphics.setBlendMode("alpha", "premultiplied")
    love.graphics.draw(
        img,
        0,
        0,
        0,
        logicalW / img:getWidth(),
        logicalH / img:getHeight()
    )
    love.graphics.setBlendMode("alpha")
    love.graphics.setCanvas(previousCanvas)
    love.graphics.pop()
    return outCanvas:newImageData()
end
---
-- @param options0 - The root object
-- @param options0.filePath - The root object
-- @param options0.frameData - The root object
-- @param options0.logicalH - The root object
-- @param options0.logicalW - The root object
-- @param options0.regionH - The root object
-- @param options0.regionW - The root object
local function outputFrame(____, ____bindingPattern0)
    local regionW
    local regionH
    local logicalW
    local logicalH
    local frameData
    local filePath
    filePath = ____bindingPattern0.filePath
    frameData = ____bindingPattern0.frameData
    logicalH = ____bindingPattern0.logicalH
    logicalW = ____bindingPattern0.logicalW
    regionH = ____bindingPattern0.regionH
    regionW = ____bindingPattern0.regionW
    local finalData = drawToCanvas({
        extraData = nil,
        imageData = frameData,
        regionH = regionH,
        regionW = regionW,
        soulData = nil
    })
    if finalData:getWidth() ~= logicalW or finalData:getHeight() ~= logicalH then
        finalData = resizeImageData(finalData, logicalW, logicalH)
    end
    local framePath = filePath
    saveImageData(finalData, framePath)
end
---
-- @param options0 - The root object
-- @param options0.atlasData - The root object
-- @param options0.card - The root object
-- @param options0.filePath - The root object
-- @param options0.logicalH - The root object
-- @param options0.logicalW - The root object
-- @param options0.regionH - The root object
-- @param options0.regionW - The root object
local function outputAnimation(____, ____bindingPattern0)
    local regionW
    local regionH
    local logicalW
    local logicalH
    local filePath
    local card
    local atlasData
    atlasData = ____bindingPattern0.atlasData
    card = ____bindingPattern0.card
    filePath = ____bindingPattern0.filePath
    logicalH = ____bindingPattern0.logicalH
    logicalW = ____bindingPattern0.logicalW
    regionH = ____bindingPattern0.regionH
    regionW = ____bindingPattern0.regionW
    local base_name = __TS__StringReplaceAll(card.key, "?", "_")
    local image_folder = ((output_root .. "images/") .. base_name) .. "/"
    love.filesystem.createDirectory(image_folder)
    local frames = createAnimationFrames(card, atlasData, regionW, regionH)
    outputFrame(nil, {
        filePath = filePath,
        frameData = frames[1],
        logicalH = logicalH,
        logicalW = logicalW,
        regionH = regionH,
        regionW = regionW
    })
    for ____, ____value in __TS__Iterator(__TS__ArrayEntries(frames)) do
        local index = ____value[1]
        local frameData = ____value[2]
        outputFrame(
            nil,
            {
                filePath = (((image_folder .. base_name) .. "_") .. tostring(index)) .. ".png",
                frameData = frameData,
                logicalH = logicalH,
                logicalW = logicalW,
                regionH = regionH,
                regionW = regionW
            }
        )
    end
    local IS_WINDOWS = love.system.getOS() == "Windows"
    local SH_PREFIX = IS_WINDOWS and "powershell.exe -command " or ""
    local common = "-threads 0 -thread_type slice -vsync 0"
    local EXPORT_FPS = 10
    local FPS_FLAG = tostring(EXPORT_FPS)
    local QUOTE = IS_WINDOWS and "\"" or "'"
    local INPUT_PATTERN = (((QUOTE .. image_folder) .. base_name) .. "_%d.png") .. QUOTE
    local GIF_FPSFLAG = tostring(100 / 3 * (EXPORT_FPS / 30))
    local filt_gif = (((QUOTE .. "format=rgba,fps=") .. GIF_FPSFLAG) .. ",split[a][b];[a]palettegen=reserve_transparent=1:stats_mode=single[p];[b][p]paletteuse=dither=bayer:bayer_scale=5:new=1") .. QUOTE
    local gif_path = ((output_root .. "images/") .. base_name) .. ".gif"
    local filt_apng = ((QUOTE .. "format=rgba,fps=") .. FPS_FLAG) .. QUOTE
    local apng_path = ((output_root .. "images/") .. base_name) .. ".apng"
    local NULL_REDIRECT = IS_WINDOWS and "> $null 2>&1" or "> /dev/null 2>&1"
    local ffmpegGifCommand = (((((((((((SH_PREFIX .. "ffmpeg -y ") .. common) .. " -f image2 -framerate ") .. FPS_FLAG) .. " -start_number 0 -i ") .. INPUT_PATTERN) .. " -filter_complex ") .. filt_gif) .. " -gifflags +transdiff -color_primaries bt709 -colorspace bt709 -color_trc bt709 -loop 0 ") .. gif_path) .. " ") .. NULL_REDIRECT
    local ffmpegApngCommand = (((((((((((SH_PREFIX .. "ffmpeg -y ") .. common) .. " -f image2 -framerate ") .. FPS_FLAG) .. " -start_number 0 -i ") .. INPUT_PATTERN) .. " -filter_complex ") .. filt_apng) .. " -plays 0 -pix_fmt rgba -compression_level 3 ") .. apng_path) .. " ") .. NULL_REDIRECT
    os.execute(ffmpegApngCommand)
    os.execute(ffmpegGifCommand)
end
---
-- @param card
local function outputImage(____, card)
    local atlasGroup = G.ASSET_ATLAS
    if card.set == "Blind" then
        atlasGroup = G.ANIMATION_ATLAS
    end
    assignAtlasIfNeeded(card)
    print("outputImage: start")
    local atlasData = getAtlasData(card, {atlasGroup = atlasGroup})
    if not outputImages or not atlasData then
        return
    end
    print("outputImage: crop & resize")
    local filePath = ((output_root .. "images/") .. __TS__StringReplaceAll(card.key, "?", "_")) .. ".png"
    local ____getLogicalAndRegion_result_9 = getLogicalAndRegion(card, {atlasGroup = atlasGroup})
    local logicalH = ____getLogicalAndRegion_result_9.logicalH
    local logicalW = ____getLogicalAndRegion_result_9.logicalW
    local regionH = ____getLogicalAndRegion_result_9.regionH
    local regionW = ____getLogicalAndRegion_result_9.regionW
    if atlasGroup == G.ANIMATION_ATLAS then
        outputAnimation(nil, {
            atlasData = atlasData,
            card = card,
            filePath = filePath,
            logicalH = logicalH,
            logicalW = logicalW,
            regionH = regionH,
            regionW = regionW
        })
        return
    end
    local imageData = createImageData(card, atlasData, regionW, regionH)
    local extraData = createExtraData(card, atlasData, regionW, regionH)
    local soulData = createSoulData(card, atlasData, regionW, regionH)
    imageData = drawToCanvas({
        extraData = extraData,
        imageData = imageData,
        regionH = regionH,
        regionW = regionW,
        soulData = soulData
    })
    if imageData:getWidth() ~= logicalW or imageData:getHeight() ~= logicalH then
        imageData = resizeImageData(imageData, logicalW, logicalH)
    end
    saveImageData(imageData, filePath)
    print("outputImage: done")
end
____exports.default = outputImage
return ____exports
 end,
["library.server.handle-message.exporter._common._exports"] = function(...) 
local ____exports = {}
do
    local ____convert_2Dto_2Dhex_2Ets = require("library.server.handle-message.exporter._common.convert-to-hex")
    ____exports.convertToHex = ____convert_2Dto_2Dhex_2Ets.default
end
do
    local ____get_2Ddescription_2Dfrom_2Dtable_2Ets = require("library.server.handle-message.exporter._common.get-description-from-table")
    ____exports.getDescriptionFromTable = ____get_2Ddescription_2Dfrom_2Dtable_2Ets.default
end
do
    local ____get_2Dname_2Dfrom_2Dtable_2Ets = require("library.server.handle-message.exporter._common.get-name-from-table")
    ____exports.getNameFromTable = ____get_2Dname_2Dfrom_2Dtable_2Ets.default
end
do
    local ____output_2Dimage_2Ets = require("library.server.handle-message.exporter._common.output-image")
    ____exports.outputImage = ____output_2Dimage_2Ets.default
end
return ____exports
 end,
["library.server.handle-message.exporter.process-blind"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__StringReplace = ____lualib.__TS__StringReplace
local ____exports = {}
local _____exports_2Ets = require("library.server.handle-message.exporter._common._exports")
local outputImage = _____exports_2Ets.outputImage
---
-- @param sets
-- @param blind
-- @noSelf
-- @example
local function processBlind(sets, blind)
    local item = {}
    outputImage(
        nil,
        __TS__ObjectAssign({}, blind, {atlas = blind.atlas or "blind_chips", set = "Blind"})
    )
    if sets.Blind == nil then
        sets.Blind = {}
    end
    if not sets.Blind[blind.key] then
        item.key = blind.key
        item.name = localize({key = blind.key, set = "Blind", type = "name_text"})
        local loc_variables = nil
        if item.name == "The Ox" then
            loc_variables = {localize(G.GAME.current_round.most_played_poker_hand, "poker_hands")}
        end
        if blind.loc_vars and type(blind.loc_vars) == "function" then
            local result = blind:loc_vars() or ({})
            loc_variables = result.vars or ({})
        end
        item.description = localize({key = blind.key, set = "Blind", type = "raw_descriptions", vars = loc_variables or blind.vars})
        if blind.mod and blind.mod.id ~= "Aura" and blind.mod.id ~= "aure_spectral" then
            item.mod = blind.mod.id
        end
        item.tags = {}
        item.image_url = ("images/" .. __TS__StringReplace(blind.key, "?", "_")) .. ".png"
    end
    if item.name then
        sets.Blind[item.key] = item
    end
end
____exports.default = processBlind
return ____exports
 end,
["library.server.handle-message.exporter.process-edition"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__StringReplace = ____lualib.__TS__StringReplace
local ____exports = {}
local _____exports_2Ets = require("library.server.handle-message.exporter._common._exports")
local getDescriptionFromTable = _____exports_2Ets.getDescriptionFromTable
local getNameFromTable = _____exports_2Ets.getNameFromTable
local ____output_rendered_image = require("library.server.handle-message.exporter.process-edition.output_rendered_image")
local output_rendered_image = ____output_rendered_image.output_rendered_image
---
-- @param sets
-- @param card
-- @noSelf
-- @example
local function processEdition(sets, card)
    local item = {}
    local ____card_config_0 = card.config
    local center = ____card_config_0.center
    output_rendered_image(card)
    if card.ability_UIBox_table ~= nil then
        item.name = getNameFromTable(card.ability_UIBox_table.name)
        item.description = getDescriptionFromTable(card.ability_UIBox_table.main)
    end
    item.key = center.key
    item.set = center.set
    if center.mod and center.mod.id ~= "Aura" and center.mod.id ~= "aure_spectral" then
        item.mod = center.mod.id
    end
    item.tags = {}
    item.image_url = ("images/" .. __TS__StringReplace(center.key, "?", "_")) .. ".png"
    if item.name ~= nil then
        local ____sets_1, ____item_set_2 = sets, item.set
        if ____sets_1[____item_set_2] == nil then
            ____sets_1[____item_set_2] = {}
        end
        sets[item.set][item.key] = item
    end
end
____exports.default = processEdition
return ____exports
 end,
["library.server.handle-message.exporter.process-edition.output_rendered_image"] = function(...) 
local output_root = "output/"
local EXPORT_FRAMES = 120 -- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
local EXPORT_FPS = 30     -- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
local timer

--------------------------------------------------------------------
-- helper : frame-rate → dt and string versions used later
--------------------------------------------------------------------
local DT = 1 / EXPORT_FPS
local FPS_FLAG = tostring(EXPORT_FPS)                     -- "30"
local GIF_FPSFLAG = tostring(100 / 3 * (EXPORT_FPS / 30)) -- keeps 30 ms @ any fps
local function draw_sprite_single(card, sprite, shader, canvas, shadername, _shadow_height)
	love.graphics.push()
	shader = shader or G.SHADERS.dissolve
	shadername = shadername or "dissolve"
	local spriteargs = sprite.ARGS or {}
	local _draw_major = sprite.role.draw_major or sprite
	local args = card.ARGS or {}
	local prep = spriteargs.prep_shader or {}
	if _shadow_height then
		sprite.VT.y = sprite.VT.y - _draw_major.shadow_parrallax.y * _shadow_height
		sprite.VT.x = sprite.VT.x - _draw_major.shadow_parrallax.x * _shadow_height
		sprite.VT.scale = sprite.VT.scale * (1 - 0.2 * _shadow_height)
	end

	args.send_to_shader = args.send_to_shader or nil
	prep.cursor_pos = prep.cursor_pos or {}
	prep.cursor_pos[1] = _draw_major.tilt_var and _draw_major.tilt_var.mx * G.CANV_SCALE or 0 * G.CANV_SCALE
	prep.cursor_pos[2] = _draw_major.tilt_var and _draw_major.tilt_var.my * G.CANV_SCALE or 0 * G.CANV_SCALE
	if shader == G.SHADERS.vortex then
		shader:send('vortex_amt', G.TIMERS.REAL - (G.vortex_time or 0))
	else
		shader:send('screen_scale', G.TILESCALE * G.TILESIZE * (_draw_major.mouse_damping or 1) * G.CANV_SCALE)
		shader:send('hovering', ((_shadow_height) or true and 0 or (_draw_major.hover_tilt or 0) * (1)))
		shader:send("dissolve", math.abs(_draw_major.dissolve or 0))
		shader:send("time", 123.33412 * (_draw_major.ID / 1.14212 or 12.5123152) % 3000)
		shader:send("texture_details", sprite:get_pos_pixel())
		shader:send("image_details", sprite:get_image_dims())
		shader:send("burn_colour_1", _draw_major.dissolve_colours and _draw_major.dissolve_colours[1] or G.C.CLEAR)
		shader:send("burn_colour_2", _draw_major.dissolve_colours and _draw_major.dissolve_colours[2] or G.C.CLEAR)
		shader:send("shadow", not not _shadow_height)
		if type(args.send_to_shader) == 'table' and args.send_to_shader.betmma == true then
			for k, v in ipairs(args.send_to_shader.extra) do
				shader:send(v.name, v.val or (v.func and v.func()) or v.ref_table[v.ref_value])
			end

			args.send_to_shader = nil
		end

		if shadername == 'tentacle' then
			shader:send("real_time", G.TIMERS.REAL - (G.vortex_time or 0))
		end
		if args and args.send_to_shader and shader ~= G.SHADERS.dissolve then
			shader:send(SMODS.Shaders[shadername] and
				(SMODS.Shaders[shadername].original_key or SMODS.Shaders[shadername].path:gsub(".fs", "")) or
				shadername, args.send_to_shader)
		end
	end

	local p_shader = SMODS.Shader.obj_table[shadername]
	if p_shader and type(p_shader.send_vars) == "function" then
		local sh = G.SHADERS[shadername]
		local parent_card = sprite.role.major and sprite.role.major:is(Card) and sprite.role.major
		local send_vars = p_shader.send_vars(sprite, parent_card)
		if type(send_vars) == "table" then
			for key, value in pairs(send_vars) do
				sh:send(key, value)
			end
		end
	end

	love.graphics.setShader(shader, shader)
	love.graphics.push()
	if sprite.sprite_pos.x ~= sprite.sprite_pos_copy.x or sprite.sprite_pos.y ~= sprite.sprite_pos_copy.y then
		sprite:set_sprite_pos(sprite.sprite_pos)
	end

	love.graphics.setColor(overlay or G.BRUTE_OVERLAY or G.C.WHITE)
	love.graphics.pop()
	love.graphics.draw(sprite.atlas.image, sprite.sprite, 0, 0, 0, 2, 2)
	sprite.under_overlay = G.under_overlay
	love.graphics.pop()
	love.graphics.setShader()
	if _shadow_height then
		sprite.VT.y = sprite.VT.y + _draw_major.shadow_parrallax.y * _shadow_height
		sprite.VT.x = sprite.VT.x + _draw_major.shadow_parrallax.x * _shadow_height
		sprite.VT.scale = sprite.VT.scale / (1 - 0.2 * _shadow_height)
	end
	return canvas, shader, shadername
end

local function draw_sprite(card, sprite, shader, canvas, shadername, _shadow_height)
	if not sprite.states.visible then
		return
	end
	if sprite.draw_steps then
		for k, v in ipairs(sprite.draw_steps) do
			if sprite:is(Sprite) and v.shader then
				draw_sprite_single(card, sprite, G.SHADERS[v.shader] or nil, canvas, v.shader or nil, v.shadow_height)
			end
		end
	elseif sprite:is(Sprite) then
		draw_sprite_single(card, sprite, shader, canvas, shadername, _shadow_height)
	end

	for k, v in pairs(sprite.children) do
		if k ~= 'h_popup' and v:is(Sprite) then
			draw_sprite_single(card, v, G.SHADERS[v.shader] or shader, canvas, v.shader or shadername, _shadow_height)
		end
	end

	sprite.under_overlay = G.under_overlay
end

local function output_rendered_image(card)
	timer = 0
	local file_path_old = output_root .. "images/" .. card.config.center.key:gsub("?", "_") .. ".png"
	love.filesystem.createDirectory(output_root .. "images/" .. card.config.center.key:gsub("?", "_"))
	local exportcanvas

	for countdown = EXPORT_FRAMES, 1, -1 do -- was 120
		card.hovering = true
		card.states.hover.is = true
		G:update(DT) -- was 1/30
		G.real_dt = DT -- was 1/30
		card:update(DT) -- was 1/30

		card.hover_tilt = 1
		local file_path = output_root .. "images/" .. card.config.center.key:gsub("?", "_") .. "/" ..
			card.config.center.key:gsub("?", "_") .. (EXPORT_FRAMES + 1 - countdown) .. ".png" -- idx
		local w = 71 * G.SETTINGS.GRAPHICS.texture_scaling
		local h = 95 * G.SETTINGS.GRAPHICS.texture_scaling
		local canvas = love.graphics.newCanvas(w, h, {
			type = '2d',
			readable = true
		})

		love.graphics.push()
		local oldCanvas = love.graphics.getCanvas()
		love.graphics.setCanvas(canvas)
		local oldshader      = love.graphics.getShader()
		card.tilt_var        = {}

		card.tilt_var        = {
			mx = 0,
			my = 0,
			dx = 0,
			dy = 0,
			amt = 0
		}
		card.ambient_tilt    = 0.2

		local tilt_factor    = 0.3
		card.states.focus.is = true
		local total_frames   = 120
		local aspect         = 1

		local boomerang_len  = total_frames * 2
		local t_raw          = (timer % boomerang_len) / boomerang_len
		local t_boomerang    = t_raw < 0.5 and (t_raw * 2) or (2 - t_raw * 2)

		local function hybrid_ease(t)
			local s1 = t * t * t * (t * (t * 6 - 15) + 10)
			local s2 = 0.5 - 0.5 * math.cos(math.pi * t)
			return 0.6 * s2 + 0.4 * s1
		end

		local s = hybrid_ease(t_boomerang)

		-- Diagonal S-curve parameters
		local a = 0.85
		local b = 0.92
		local amp = 0.25 -- amplitude of the S-curve wiggle, tune as desired

		-- Linear interpolation from -a to +a, -b to +b
		local function lerp(a, b, t) return a + (b - a) * t end

		local x = lerp(-a, a, s) * aspect
		local y = lerp(-b, b, s) + amp * math.sin(math.pi * s)

		card.hover_offset.x = x
		card.hover_offset.y = y
		card.hover_offset.x = x * aspect
		card.hover_offset.y = y

		if card.states.focus.is then
			card.tilt_var.mx, card.tilt_var.my = card.tilt_var.dx * card.T.w * G.TILESCALE * G.TILESIZE,
				card.tilt_var.dy * card.T.h * G.TILESCALE * G.TILESIZE
			card.tilt_var.amt = math.abs(card.hover_offset.y + card.hover_offset.x - 1 + card.tilt_var.dx +
				card.tilt_var.dy - 1) * tilt_factor
		elseif card.states.hover.is then
			card.tilt_var.mx, card.tilt_var.my = 0, 0
			card.tilt_var.amt = math.abs(card.hover_offset.y + card.hover_offset.x - 1) * tilt_factor
		elseif card.ambient_tilt then
			local tilt_angle = G.TIMERS.REAL * (1.56 + (card.ID / 1.14212) % 1) + card.ID / 1.35122
			card.tilt_var.mx = ((0.5 + 0.5 * card.ambient_tilt * math.cos(tilt_angle)) * card.VT.w + card.VT.x +
				G.ROOM.T.x) * G.TILESIZE * G.TILESCALE
			card.tilt_var.my = ((0.5 + 0.5 * card.ambient_tilt * math.sin(tilt_angle)) * card.VT.h + card.VT.y +
				G.ROOM.T.y) * G.TILESIZE * G.TILESCALE
			card.tilt_var.amt = card.ambient_tilt * (0.5 + math.cos(tilt_angle)) * tilt_factor
		end

		card.ARGS.send_to_shader = card.ARGS.send_to_shader or {}
		card.ARGS.send_to_shader[1] = math.min(card.VT.r * 3, 1) + G.TIMERS.REAL / 28 + 0 + card.tilt_var.amt
		card.ARGS.send_to_shader[2] = G.TIMERS.REAL
		for k, v in pairs(card.children) do
			v.VT.scale = card.VT.scale
		end
		local export_steps = {
			shadow = {
				key = "shadow",
				func = function(card)
					card.ARGS.send_to_shader = card.ARGS.send_to_shader or {}
					card.ARGS.send_to_shader[1] = math.min(card.VT.r * 3, 1) + math.sin(G.TIMERS.REAL / 28) + 1 + 0 +
						card.tilt_var.amt
					card.ARGS.send_to_shader[2] = G.TIMERS.REAL

					for k, v in pairs(card.children) do
						v.VT.scale = card.VT.scale
					end

					G.shared_shadow = card.sprite_facing == 'front' and card.children.center or card.children.back

					-- Draw the shadow
					if not card.no_shadow and G.SETTINGS.GRAPHICS.shadows == 'On' and
						((card.ability.effect ~= 'Glass Card' and not card.greyed and card:should_draw_shadow()) and
							((card.area and card.area ~= G.discard and card.area.config.type ~= 'deck') or not card.area or
								card.states.drag.is)) then
						card.shadow_height = 0 * (0.08 + 0.4 * math.sqrt(card.velocity.x ^ 2)) +
							((((card.highlighted and card.area == G.play) or card.states.drag.is) and
									0.35) or (card.area and card.area.config.type == 'title_2') and
								0.04 or 0.1)
						draw_sprite(card, G.shared_shadow, G.SHADERS.dissolve, canvas, "dissolve", card.shadow_height)
					end
				end
			},
			particles = {
				key = "Particles",
				func = function(card)
					if card.children.particles then
						draw_sprite(card, card.children.particles, G.SHADERS.dissolve, canvas, "dissolve")
					end
				end
			},

			center = {
				key = "center",
				func = function(card)
					if (card.edition and card.edition.negative and not card.delay_edition) or
						(card.ability.name == 'Antimatter' and
							(card.config.center.discovered or card.bypass_discovery_center)) then
						draw_sprite(card, card.children.center, G.SHADERS.negative, canvas, "negative")
					elseif not card:should_draw_base_shader() then
						-- Don't render base dissolve shader.
					elseif not card.greyed and (get_betmma_shaders and get_betmma_shaders(card)) then
						-- do nothing
					elseif not card.greyed then
						draw_sprite(card, card.children.center, G.SHADERS.dissolve, canvas, "dissolve")
					end

					if draw_betmma_shaders ~= nil then
						if get_betmma_shaders(card) then
							draw_sprite(card, card.children.center, G.SHADERS[get_betmma_shaders(card)], canvas,
								get_betmma_shaders(card))
							if card.children.front and card.ability.effect ~= 'Stone Card' then
								draw_sprite(card, card.children.front, G.SHADERS[get_betmma_shaders(card)], canvas,
									get_betmma_shaders(card))
							end
						end
					end
					local center = card.config.center
					if center.draw and type(center.draw) == 'function' then
						if center:is(Sprite) then
							draw_sprite(card, center,
								(center.shader and G.SHADERS[center.shader]) or G.SHADERS.dissolve, canvas,
								center.shader or "dissolve")
						end
						for k, v in pairs(center.children) do
							if v:is(Sprite) then
								draw_sprite(card, v, (v.shader and G.SHADERS[v.shader]) or G.SHADERS.dissolve, canvas,
									v.shader or "dissolve")
							end
						end
					end
				end
			},
			front = {
				key = "Front",
				func = function(card)
					if (card.edition and card.edition.negative and not card.delay_edition) or
						(card.ability.name == 'Antimatter' and
							(card.config.center.discovered or card.bypass_discovery_center)) then
						if card.children.front and
							(card.ability.delayed or
								(card.ability.effect ~= 'Stone Card' and not card.config.center.replace_base_card)) then
							draw_sprite(card, card.children.front, G.SHADERS.negative, canvas, "negative")
						end
					else
						if card.children.front and
							(card.ability.effect ~= 'Stone Card' and not card.config.center.replace_base_card) then
							draw_sprite(card, card.children.front, G.SHADERS.dissolve, canvas, "dissolve")
						end
					end

					if card.edition and not card.delay_edition then
						for k, v in pairs(G.P_CENTER_POOLS.Edition) do
							if card.edition[v.key:sub(3)] and v.shader then
								if type(v.draw) == 'function' then
									draw_sprite(card, v, G.SHADERS[v.shader], canvas, v.shader)
								else
									draw_sprite(card, card.children.center, G.SHADERS[v.shader], canvas, v.shader)
									if card.children.front and card.ability.effect ~= 'Stone Card' and
										not card.config.center.replace_base_card then
										draw_sprite(card, card.children.front, G.SHADERS[v.shader], canvas, v.shader)
									end
								end
							end
						end
					end
					if (card.edition and card.edition.negative) or
						(card.ability.name == 'Antimatter' and
							(card.config.center.discovered or card.bypass_discovery_center)) then
						draw_sprite(card, card.children.center, G.SHADERS.negative_shine, canvas, "negative_shine")
					end
				end
			},
			others = {
				key = "Others",
				func = function(card)
					for k, v in pairs(card.children) do
						if not SMODS.draw_ignore_keys[k] then
							draw_sprite(card, v, (v.shader and G.SHADERS[v.shader]) or G.SHADERS.dissolve, canvas,
								v.shader or "dissolve")
						end
					end
				end
			}
		}

		for _, k in ipairs(SMODS.DrawStep.obj_buffer) do
			if export_steps[k] then
				export_steps[k].func(card)
			end
		end

		card.under_overlay = G.under_overlay
		love.graphics.setCanvas(oldCanvas)
		love.graphics.setShader(oldshader)
		love.graphics.pop()
		if love.filesystem.getInfo(file_path) then
			love.filesystem.remove(file_path)
		end
		canvas:newImageData():encode('png', file_path)
		exportcanvas = canvas
		timer = timer + 1
	end
	timer = 0
	exportcanvas:newImageData():encode('png', file_path_old)

	--------------------------------------------------------------------
	--  FFMPEG EXPORT : forward + reverse (“boomerang”)                --
	--  Source PNGs are numbered 1 … 120 (count-down naming scheme)    --
	--  Final order: 120,119,…,1,2,3,…,119  → 238 unique frames        --
	--------------------------------------------------------------------
	local FRAMES = EXPORT_FRAMES -- 120
	local image_folder = output_root .. "images/" .. card.config.center.key:gsub("?", "_") .. "/"
	local base_name = card.config.center.key:gsub("?", "_")

	local gif_path = output_root .. "images/" .. base_name .. ".gif"
	local apng_path = output_root .. "images/" .. base_name .. ".apng"
	local webp_path = output_root .. "images/" .. base_name .. ".webp"

	------------------------------------------------------------------
	--  PLATFORM & QUOTING HELPERS
	------------------------------------------------------------------
	local IS_WINDOWS = love.system.getOS():match("Windows")
	local NULL_REDIRECT = IS_WINDOWS and "> $null 2>&1" or "> /dev/null 2>&1"
	local SH_PREFIX = IS_WINDOWS and "powershell.exe -command " or ""

	local QPATH = IS_WINDOWS and '"%s"' or "'%s'"
	local QFILT = IS_WINDOWS and "'%s'" or '"%s"'

	------------------------------------------------------------------
	--  Ensure FFmpeg is present
	------------------------------------------------------------------
	local have_ffmpeg =
		IS_WINDOWS and (os.execute("powershell.exe -command Get-Command ffmpeg " .. NULL_REDIRECT) == 0) or
		(os.execute("command -v ffmpeg " .. NULL_REDIRECT) == 0)

	if not have_ffmpeg then
		print("[WARN] ffmpeg not found in PATH – export aborted.")
		return
	end

	------------------------------------------------------------------
	--  QUOTED INPUT/OUTPUT PATHS
	------------------------------------------------------------------
	--  %%d expands to 1, 2, … 120 (no leading zeros required)
	local INPUT_PATTERN = string.format(QPATH, image_folder .. base_name .. "%d.png")
	local GIF_Q = string.format(QPATH, gif_path)
	local APNG_Q = string.format(QPATH, apng_path)
	local WEBP_Q = string.format(QPATH, webp_path)

	------------------------------------------------------------------
	--  FILTER GRAPH  (no smart quotes)
	------------------------------------------------------------------
	--  1. duplicate the incoming stream
	--  2. tmp → reverse 120→1, drop first frame (120)     → 119→1
	--  3. src → forward, drop first frame (1)             → 2→120
	--  4. concat : 119→1  +  2→120                        → 238 frames
	--  5. setsar=1  (square pixels)
	local boomerang = "[0]split[src][tmp];" .. "[tmp]reverse,setpts=PTS-STARTPTS,trim=start_frame=1[rev];" ..
		"[src]trim=start_frame=1,setpts=PTS-STARTPTS[fwd];" .. "[rev][fwd]concat=n=2:v=1:a=0[out];" ..
		"[out]setsar=1"

	local filt_gif = boomerang .. ",format=rgba,fps=" .. GIF_FPSFLAG .. ",split[a][b];" ..
		"[a]palettegen=reserve_transparent=1:stats_mode=single[p];" ..
		"[b][p]paletteuse=dither=bayer:bayer_scale=5:new=1"

	local filt_apng = boomerang .. ",format=rgba,fps=" .. FPS_FLAG

	local filt_webp = filt_apng -- identical chain, just different encoder flags

	------------------------------------------------------------------
	--  COMMAND STRINGS
	------------------------------------------------------------------
	local common = "-threads 0 -thread_type slice -vsync 0"

	local ffmpeg_gif_cmd = string.format("%sffmpeg -y %s -f image2 -framerate %s -start_number 1 -i %s " ..
		"-filter_complex %s " .. "-gifflags +transdiff " ..
		"-color_primaries bt709 -colorspace bt709 -color_trc bt709 " ..
		"-loop 0 %s %s", SH_PREFIX, common, FPS_FLAG, INPUT_PATTERN,
		string.format(QFILT, filt_gif), GIF_Q, NULL_REDIRECT)


	local ffmpeg_apng_cmd = string.format("%sffmpeg -y %s -f image2 -framerate %s -start_number 1 -i %s " ..
		"-filter_complex %s " ..
		"-plays 0 -pix_fmt rgba -compression_level 3 %s %s",
		SH_PREFIX, common, FPS_FLAG, INPUT_PATTERN, string.format(QFILT, filt_apng), APNG_Q, NULL_REDIRECT)

	local ffmpeg_webp_cmd = string.format("%sffmpeg -y %s -f image2 -framerate %s -start_number 1 -i %s " ..
		"-filter_complex %s " ..
		"-lossless 1 -compression_level 6 -quality 100 -loop 0 " ..
		"-color_primaries bt709 -colorspace bt709 -color_trc bt709 " .. "%s %s",
		SH_PREFIX, common, FPS_FLAG, INPUT_PATTERN, string.format(QFILT, filt_webp), WEBP_Q, NULL_REDIRECT)

	------------------------------------------------------------------
	--  EXECUTE
	------------------------------------------------------------------
	os.execute(ffmpeg_gif_cmd)
	os.execute(ffmpeg_apng_cmd)
	-- os.execute(ffmpeg_webp_cmd)   -- uncomment if WebP desired
end

local default = {
	output_rendered_image = output_rendered_image
}

return default
 end,
["library.server.handle-message.exporter.process-enhancement"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__StringReplace = ____lualib.__TS__StringReplace
local ____exports = {}
local _____exports_2Ets = require("library.server.handle-message.exporter._common._exports")
local getDescriptionFromTable = _____exports_2Ets.getDescriptionFromTable
local outputImage = _____exports_2Ets.outputImage
---
-- @param sets
-- @param card
-- @noSelf
-- @example
local function processEnhancement(sets, card)
    local item = {}
    local ____card_config_0 = card.config
    local center = ____card_config_0.center
    if center.atlas == nil then
        center.atlas = "centers"
    end
    outputImage(nil, center)
    if card.ability_UIBox_table then
        item.name = localize({key = center.key, set = center.set, type = "name_text"})
        item.description = getDescriptionFromTable(card.ability_UIBox_table.main)
    end
    item.key = center.key
    item.set = center.set
    if center.mod ~= nil and center.mod.id ~= "Aura" and center.mod.id ~= "aure_spectral" then
        item.mod = center.mod.id
    end
    item.tags = {}
    item.image_url = ("images/" .. __TS__StringReplace(center.key, "?", "_")) .. ".png"
    if item.name ~= nil then
        if not sets[item.set] then
            sets[item.set] = {}
        end
        sets[item.set][item.key] = item
    end
end
____exports.default = processEnhancement
return ____exports
 end,
["library.server.handle-message.exporter.process-mod.process-mod-icon"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__StringReplace = ____lualib.__TS__StringReplace
local ____exports = {}
local ____output_2Dimage_2Ets = require("library.server.handle-message.exporter._common.output-image")
local outputImage = ____output_2Dimage_2Ets.default
---
-- @param mod
local function processModIcon(____, mod)
    local atlas = mod.prefix and tostring(mod.prefix) .. "_modicon" or "modicon"
    local pos = {x = 0, y = 0}
    if not mod.can_load and mod.load_issues and mod.load_issues.prefix_conflict then
        atlas = "mod_tags"
        pos = {x = 0, y = 0}
    end
    local key = "icon_" .. tostring(mod.id or mod.prefix or mod.name or "mod")
    local card = {atlas = atlas, key = key, pos = pos, set = atlas}
    outputImage(nil, card)
    return ("images/" .. __TS__StringReplace(key, "?", "_")) .. ".png"
end
____exports.default = processModIcon
return ____exports
 end,
["library.server.handle-message.exporter.process-mod._exports"] = function(...) 
local ____exports = {}
do
    local ____process_2Dmod_2Dicon_2Ets = require("library.server.handle-message.exporter.process-mod.process-mod-icon")
    ____exports.processModIcon = ____process_2Dmod_2Dicon_2Ets.default
end
return ____exports
 end,
["library.server.handle-message.exporter.process-mod"] = function(...) 
local ____exports = {}
local _____exports_2Ets = require("library.server.handle-message.exporter._common._exports")
local convertToHex = _____exports_2Ets.convertToHex
local _____exports_2Ets = require("library.server.handle-message.exporter.process-mod._exports")
local processModIcon = _____exports_2Ets.processModIcon
---
-- @param sets
-- @param mod
-- @noSelf
-- @example
local function processMod(sets, mod)
    local item = {}
    if mod.name and mod.id then
        sets.Mods[mod.id] = {
            id = mod.id,
            badge_colour = convertToHex(mod.badge_colour),
            badge_text_colour = convertToHex(mod.badge_text_colour),
            display_name = mod.display_name or mod.name,
            image_url = processModIcon(nil, mod),
            name = mod.name
        }
    end
end
____exports.default = processMod
return ____exports
 end,
["library.server.handle-message.exporter.process-suit"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
local ____output_2Dimage_2Ets = require("library.server.handle-message.exporter._common.output-image")
local outputImage = ____output_2Dimage_2Ets.default
---
-- @param sets
-- @param suit
-- @noSelf
-- @example
local function processSuit(sets, suit)
    local item = {}
    local input = __TS__ObjectAssign(
        {},
        suit,
        {
            atlas = suit.lc_atlas or "cards_1",
            pos = __TS__ObjectAssign({}, suit.pos, {x = 12})
        }
    )
    outputImage(nil, input)
    item.name = G.localization.misc.suits_plural[suit.key]
    item.key = suit.key
    if suit.mod ~= nil and suit.mod.id ~= "Aura" and suit.mod.id ~= "aure_spectral" then
        item.mod = suit.mod.id
    end
    if item.name then
        sets.Suit[item.key] = item
    end
end
____exports.default = processSuit
return ____exports
 end,
["library.server.handle-message.exporter.process-tag"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__StringReplace = ____lualib.__TS__StringReplace
local ____exports = {}
local _____exports_2Ets = require("library.server.handle-message.exporter._common._exports")
local getDescriptionFromTable = _____exports_2Ets.getDescriptionFromTable
local getNameFromTable = _____exports_2Ets.getNameFromTable
local outputImage = _____exports_2Ets.outputImage
---
-- @param sets
-- @param tag
-- @noSelf
-- @example
local function processTag(sets, tag)
    local item = {}
    if tag.set == nil then
        tag.set = "Tag"
    end
    if tag.atlas == nil then
        tag.atlas = "tags"
    end
    outputImage(nil, tag)
    if tag.tag_sprite.ability_UIBox_table ~= nil then
        item.name = getNameFromTable(tag.tag_sprite.ability_UIBox_table.name)
        item.description = getDescriptionFromTable(tag.tag_sprite.ability_UIBox_table.main)
    end
    item.key = tag.key
    item.set = tag.set
    if tag.mod ~= nil and tag.mod.id ~= "Aura" and tag.mod.id ~= "aure_spectral" then
        item.mod = tag.mod.id
    end
    item.tags = {}
    item.image_url = ("images/" .. __TS__StringReplace(tag.key, "?", "_")) .. ".png"
    if item.name then
        if sets.Tag == nil then
            sets.Tag = {}
        end
        sets.Tag[item.key] = item
    end
end
____exports.default = processTag
return ____exports
 end,
["library.server.handle-message.exporter.process_card"] = function(...) 
local ____exports = {}
---
-- @param sets
-- @param card
-- @noSelf
-- @example
local function process_card(sets, card)
end
____exports.default = process_card
return ____exports
 end,
["library.server.handle-message.exporter.process_curse"] = function(...) 
local ____exports = {}
---
-- @param sets
-- @param curse
-- @noSelf
-- @example
local function process_curse(sets, curse)
end
____exports.default = process_curse
return ____exports
 end,
["library.server.handle-message.exporter.process_d6_side"] = function(...) 
local ____exports = {}
---
-- @param sets
-- @param d6_side
-- @noSelf
-- @example
local function process_d6_side(sets, d6_side)
end
____exports.default = process_d6_side
return ____exports
 end,
["library.server.handle-message.exporter.process_playing_card"] = function(...) 
local ____exports = {}
---
-- @param sets
-- @param card
-- @param center
-- @param key
-- @noSelf
-- @example
local function process_playing_card(sets, card, center, key)
end
____exports.default = process_playing_card
return ____exports
 end,
["library.server.handle-message.exporter.process_seal"] = function(...) 
local ____exports = {}
---
-- @param sets
-- @param card
-- @param seal
-- @noSelf
-- @example
local function process_seal(sets, card, seal)
end
____exports.default = process_seal
return ____exports
 end,
["library.server.handle-message.exporter.process_stake"] = function(...) 
local ____exports = {}
---
-- @param sets
-- @param stake
-- @noSelf
-- @example
local function process_stake(sets, stake)
end
____exports.default = process_stake
return ____exports
 end,
["library.server.handle-message.exporter.sets"] = function(...) 
local ____exports = {}
local sets = {
    Back = {},
    Blind = {},
    Booster = {},
    Consumables = {},
    Contract = {},
    Curse = {},
    ["D6 Side"] = {},
    Edition = {},
    Enhanced = {},
    Joker = {},
    Mods = {},
    PlayingCards = {},
    Seal = {},
    Skill = {},
    Sleeve = {},
    Stake = {},
    Sticker = {},
    Suit = {},
    Tag = {},
    Voucher = {}
}
____exports.default = sets
return ____exports
 end,
["library.server.handle-message.exporter._exports"] = function(...) 
local ____exports = {}
do
    local ____filter_2Dlist_2Dfrom_2Dstring_2Ets = require("library.server.handle-message.exporter.filter-list-from-string")
    ____exports.filterListFromString = ____filter_2Dlist_2Dfrom_2Dstring_2Ets.default
end
do
    local ____process_2Dblind_2Ets = require("library.server.handle-message.exporter.process-blind")
    ____exports.processBlind = ____process_2Dblind_2Ets.default
end
do
    local ____process_2Dedition_2Ets = require("library.server.handle-message.exporter.process-edition")
    ____exports.processEdition = ____process_2Dedition_2Ets.default
end
do
    local ____process_2Denhancement_2Ets = require("library.server.handle-message.exporter.process-enhancement")
    ____exports.processEnhancement = ____process_2Denhancement_2Ets.default
end
do
    local ____process_2Dmod_2Ets = require("library.server.handle-message.exporter.process-mod")
    ____exports.processMod = ____process_2Dmod_2Ets.default
end
do
    local ____process_2Dsuit_2Ets = require("library.server.handle-message.exporter.process-suit")
    ____exports.processSuit = ____process_2Dsuit_2Ets.default
end
do
    local ____process_2Dtag_2Ets = require("library.server.handle-message.exporter.process-tag")
    ____exports.processTag = ____process_2Dtag_2Ets.default
end
do
    local ____process_card_2Ets = require("library.server.handle-message.exporter.process_card")
    ____exports.process_card = ____process_card_2Ets.default
end
do
    local ____process_curse_2Ets = require("library.server.handle-message.exporter.process_curse")
    ____exports.process_curse = ____process_curse_2Ets.default
end
do
    local ____process_d6_side_2Ets = require("library.server.handle-message.exporter.process_d6_side")
    ____exports.process_d6_side = ____process_d6_side_2Ets.default
end
do
    local ____process_playing_card_2Ets = require("library.server.handle-message.exporter.process_playing_card")
    ____exports.process_playing_card = ____process_playing_card_2Ets.default
end
do
    local ____process_seal_2Ets = require("library.server.handle-message.exporter.process_seal")
    ____exports.process_seal = ____process_seal_2Ets.default
end
do
    local ____process_stake_2Ets = require("library.server.handle-message.exporter.process_stake")
    ____exports.process_stake = ____process_stake_2Ets.default
end
do
    local ____sets_2Ets = require("library.server.handle-message.exporter.sets")
    ____exports.sets = ____sets_2Ets.default
end
return ____exports
 end,
["library.server.handle-message.exporter"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArrayToSorted = ____lualib.__TS__ArrayToSorted
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
local _____exports_2Ets = require("library.server.handle-message._common._exports")
local output_root = _____exports_2Ets.output_root
local _____exports_2Ets = require("library.server.handle-message.exporter._exports")
local filterListFromString = _____exports_2Ets.filterListFromString
local process_card = _____exports_2Ets.process_card
local process_curse = _____exports_2Ets.process_curse
local process_d6_side = _____exports_2Ets.process_d6_side
local process_playing_card = _____exports_2Ets.process_playing_card
local process_seal = _____exports_2Ets.process_seal
local process_stake = _____exports_2Ets.process_stake
local processBlind = _____exports_2Ets.processBlind
local processEdition = _____exports_2Ets.processEdition
local processEnhancement = _____exports_2Ets.processEnhancement
local processMod = _____exports_2Ets.processMod
local processSuit = _____exports_2Ets.processSuit
local processTag = _____exports_2Ets.processTag
local sets = _____exports_2Ets.sets
---
-- @noSelf
-- @example
local function run()
    local mod_filter = filterListFromString(G.EXPORT_FILTER or "")
    local clean_filter = {}
    if #mod_filter == 1 and mod_filter[1] == "" then
        clean_filter[#clean_filter + 1] = "Balatro"
        for k in pairs(SMODS.Mods) do
            clean_filter[#clean_filter + 1] = k
        end
    else
        for ____, v in ipairs(mod_filter) do
            if v == "Balatro" then
                clean_filter[#clean_filter + 1] = "Balatro"
            end
            if SMODS.Mods[v] then
                clean_filter[#clean_filter + 1] = v
            end
        end
    end
    local card = nil
    if not love.filesystem.getInfo(output_root) then
        love.filesystem.createDirectory(output_root)
    end
    if not love.filesystem.getInfo(output_root .. "images") then
        love.filesystem.createDirectory(output_root .. "images")
    end
    local keys = __TS__ArrayToSorted(__TS__ObjectKeys(G.P_CENTERS))
    for ____, key in ipairs(keys) do
        local v = G.P_CENTERS[key]
        if not v.mod then
            v.mod = {}
            v.mod.id = "Balatro"
        end
        if __TS__ArrayIncludes(clean_filter, v.mod.id) then
            print((("Processing " .. key) .. " | ") .. tostring(v.set))
            v.unlocked = true
            v.discovered = true
            repeat
                local ____switch16 = v.set
                local ____cond16 = ____switch16 == "Edition"
                if ____cond16 then
                    card = Card(
                        G.jokers.T.x + G.jokers.T.w / 2,
                        G.jokers.T.y,
                        G.CARD_W,
                        G.CARD_H,
                        G.P_CARDS.empty,
                        v
                    )
                    card:set_edition(v.key, true, true)
                    card:hover()
                    processEdition(sets, card)
                    break
                end
                ____cond16 = ____cond16 or ____switch16 == "Enhanced"
                if ____cond16 then
                    card = SMODS.create_card({
                        area = G.jokers,
                        enhancement = v.key,
                        key = "c_base",
                        legendary = false,
                        no_edition = true,
                        set = "Default",
                        skip_materialize = true
                    })
                    card:hover()
                    processEnhancement(sets, card)
                    break
                end
                ____cond16 = ____cond16 or ____switch16 == "Sticker"
                if ____cond16 then
                    card = SMODS.create_card({
                        area = G.jokers,
                        key = "c_base",
                        legendary = false,
                        no_edition = true,
                        set = "Default",
                        skip_materialize = true,
                        stickers = {v.key}
                    })
                    card:hover()
                    break
                end
                do
                    if not v.set or v.set == "Other" or v.set == "Default" then
                    elseif not v.no_collection then
                        card = SMODS.create_card({
                            area = G.jokers,
                            key = v.key,
                            legendary = v.legendary,
                            no_edition = true,
                            rarity = v.rarity,
                            set = v.set,
                            skip_materialize = true
                        })
                        do
                            local function ____catch(____error)
                                print("Error hovering card: " .. tostring(v.key))
                                print(____error)
                                card = nil
                            end
                            local ____try, ____hasReturned = pcall(function()
                                card:hover()
                                process_card(sets, card)
                            end)
                            if not ____try then
                                ____catch(____hasReturned)
                            end
                        end
                    end
                end
            until true
            if card then
                card:stop_hover()
                G.jokers:remove_card(card)
                card:remove()
            end
            card = nil
        end
    end
    for k in pairs(G.P_BLINDS) do
        local v = G.P_BLINDS[k]
        if not v.mod then
            v.mod = {}
            v.mod.id = "Balatro"
        end
        if __TS__ArrayIncludes(clean_filter, v.mod.id) then
            print((("Processing " .. k) .. " | ") .. tostring(v.set))
            v.discovered = true
            processBlind(sets, v)
        end
    end
    if G.P_CURSES then
        for k in pairs(G.P_CURSES) do
            local v = G.P_CURSES[k]
            if not v.mod then
                v.mod = {}
                v.mod.id = "Balatro"
            end
            if __TS__ArrayIncludes(clean_filter, v.mod.id) then
                print((("Processing " .. k) .. " | ") .. tostring(v.set))
                v.discovered = true
                process_curse(sets, v)
            end
        end
    end
    if G.P_D6_SIDES then
        for k in pairs(G.P_D6_SIDES) do
            local v = G.P_D6_SIDES[k]
            if not v.mod then
                v.mod = {}
                v.mod.id = "Balatro"
            end
            if __TS__ArrayIncludes(clean_filter, v.mod.id) then
                print((("Processing " .. k) .. " | ") .. tostring(v.set))
                process_d6_side(sets, v)
            end
        end
    end
    for k in pairs(G.P_SEALS) do
        local v = G.P_SEALS[k]
        if not v.mod then
            v.mod = {}
            v.mod.id = "Balatro"
        end
        if __TS__ArrayIncludes(clean_filter, v.mod.id) then
            print((("Processing " .. k) .. " | ") .. tostring(v.set))
            v.discovered = true
            card = SMODS.create_card({
                area = G.jokers,
                key = "c_base",
                no_edition = true,
                set = "Default",
                skip_materialize = true
            })
            card:set_seal(v.key, true)
            card:hover()
            process_seal(sets, card, v)
            card:stop_hover()
            G.jokers:remove_card(card)
            card:remove()
            card = nil
        end
    end
    if G.P_SKILLS then
        for k in pairs(G.P_SKILLS) do
            local v = G.P_SKILLS[k]
            if not v.mod then
                v.mod = {}
                v.mod.id = "Balatro"
            end
            if __TS__ArrayIncludes(clean_filter, v.mod.id) then
                print((("Processing " .. k) .. " | ") .. tostring(v.set))
                v.discovered = true
                card = Card(
                    G.jokers.T.x + G.jokers.T.w / 2,
                    G.jokers.T.y,
                    G.CARD_W,
                    G.CARD_H,
                    nil,
                    v,
                    {bypass_discovery_center = true}
                )
                card:hover()
                process_card(sets, card)
                if card ~= nil then
                    card:stop_hover()
                    G.jokers:remove_card(card)
                    card:remove()
                end
                card = nil
            end
        end
    end
    for k in pairs(G.P_STAKES) do
        local v = G.P_STAKES[k]
        if not v.mod then
            v.mod = {}
            v.mod.id = "Balatro"
        end
        if __TS__ArrayIncludes(clean_filter, v.mod.id) then
            print((("Processing " .. k) .. " | ") .. tostring(v.set))
            v.discovered = true
            process_stake(sets, v)
        end
    end
    for k in pairs(SMODS.Stickers) do
    end
    for k in pairs(G.P_TAGS) do
        local v = G.P_TAGS[k]
        if not v.mod then
            v.mod = {}
            v.mod.id = "Balatro"
        end
        if __TS__ArrayIncludes(clean_filter, v.mod.id) then
            print((("Processing " .. k) .. " | ") .. tostring(v.set))
            v.discovered = true
            local temporary_tag = Tag(v.key, true)
            local _, temporary_tag_sprite = temporary_tag:generate_UI()
            temporary_tag_sprite:hover()
            processTag(
                sets,
                __TS__ObjectAssign({}, temporary_tag, v)
            )
            temporary_tag_sprite:stop_hover()
            temporary_tag_sprite:remove()
            temporary_tag = nil
        end
    end
    for k in pairs(G.P_CARDS) do
        local v = G.P_CARDS[k]
        if not v.mod then
            v.mod = {}
            v.mod.id = "Balatro"
        end
        if __TS__ArrayIncludes(clean_filter, v.mod.id) then
            print((("Processing " .. k) .. " | ") .. tostring(v.suit))
            card = create_playing_card(
                {front = G.P_CARDS[k]},
                G.hand,
                true,
                true,
                {G.C.SECONDARY_SET.Spectral}
            )
            card:hover()
            process_playing_card(sets, card, v, k)
            if card ~= nil then
                card:stop_hover()
                G.jokers:remove_card(card)
                card:remove()
            end
        end
    end
    for k in pairs(SMODS.Suits) do
        local v = SMODS.Suits[k]
        if not v.mod then
            v.mod = {}
            v.mod.id = "Balatro"
        end
        if __TS__ArrayIncludes(clean_filter, v.mod.id) then
            print((("Processing " .. k) .. " | ") .. tostring(v.key))
            processSuit(sets, v)
        end
    end
    local base_mod = {id = "Balatro", badge_colour = G.C.RED, display_name = "Balatro"}
    processMod(sets, base_mod)
    for k in pairs(SMODS.Mods) do
        local v = SMODS.Mods[k]
        if __TS__ArrayIncludes(clean_filter, k) and v.can_load then
            print((("Processing " .. k) .. " | ") .. tostring(v.name))
            processMod(sets, v)
        end
    end
    return sets
end
____exports.run = run
return ____exports
 end,
["library.server.handle-message"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ObjectEntries = ____lualib.__TS__ObjectEntries
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local ____exports = {}
local json = require("library._common.json")
local exporter = require("library.server.handle-message.exporter")
---
-- @param message
-- @param server
-- @noSelf
-- @example
local function handleMessage(message, server)
    if server:isReady() then
        local ____json_decode_result_0 = json.decode(message)
        local content = ____json_decode_result_0.content
        local ____type = ____json_decode_result_0.type
        if ____type == "command" and content == "export" then
            local sets = exporter.run()
            for ____, ____value in ipairs(__TS__ObjectEntries(sets)) do
                local setKey = ____value[1]
                local set = ____value[2]
                for ____, ____value in ipairs(__TS__ObjectEntries(set)) do
                    local key = ____value[1]
                    local value = ____value[2]
                    server:sendMessage({content = {key = key, set = setKey, value = value}, type = "content"})
                end
            end
        end
        if ____type == "ask" and content == "state" then
            local state = G.STATE
            local ____opt_1 = __TS__ArrayFind(
                __TS__ObjectEntries(G.STATES),
                function(____, ____bindingPattern0)
                    local value
                    local key = ____bindingPattern0[1]
                    value = ____bindingPattern0[2]
                    return value == state
                end
            )
            local stateKey = ____opt_1 and ____opt_1[1]
            if stateKey ~= nil and server:isReady() then
                server:sendMessage({
                    content = tostring(stateKey),
                    type = "state"
                })
            end
        end
    end
end
____exports.default = handleMessage
return ____exports
 end,
["library._common.json"] = function(...) 
--
-- json.lua
--
-- Copyright (c) 2020 rxi
--
-- Permission is hereby granted, free of charge, to any person obtaining a copy of
-- this software and associated documentation files (the "Software"), to deal in
-- the Software without restriction, including without limitation the rights to
-- use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
-- of the Software, and to permit persons to whom the Software is furnished to do
-- so, subject to the following conditions:
--
-- The above copyright notice and this permission notice shall be included in all
-- copies or substantial portions of the Software.
--
-- THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
-- IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
-- FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
-- AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
-- LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
-- OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
-- SOFTWARE.
--

local json = { _version = "0.1.2" }

-------------------------------------------------------------------------------
-- Encode
-------------------------------------------------------------------------------

local encode

local escape_char_map = {
	["\\"] = "\\",
	["\""] = "\"",
	["\b"] = "b",
	["\f"] = "f",
	["\n"] = "n",
	["\r"] = "r",
	["\t"] = "t",
}

local escape_char_map_inv = { ["/"] = "/" }
for k, v in pairs(escape_char_map) do
	escape_char_map_inv[v] = k
end


local function escape_char(c)
	return "\\" .. (escape_char_map[c] or string.format("u%04x", c:byte()))
end


local function encode_nil(val)
	return "null"
end


local function encode_table(val, stack)
	local res = {}
	stack = stack or {}

	-- Circular reference?
	if stack[val] then error("circular reference") end

	stack[val] = true

	if rawget(val, 1) ~= nil or next(val) == nil then
		-- Treat as array -- check keys are valid and it is not sparse
		local n = 0
		for k in pairs(val) do
			if type(k) ~= "number" then
				error("invalid table: mixed or invalid key types")
			end
			n = n + 1
		end
		if n ~= #val then
			error("invalid table: sparse array")
		end
		-- Encode
		for i, v in ipairs(val) do
			table.insert(res, encode(v, stack))
		end
		stack[val] = nil
		return "[" .. table.concat(res, ",") .. "]"
	else
		-- Treat as an object
		for k, v in pairs(val) do
			if type(k) ~= "string" then
				error("invalid table: mixed or invalid key types")
			end
			table.insert(res, encode(k, stack) .. ":" .. encode(v, stack))
		end
		stack[val] = nil
		return "{" .. table.concat(res, ",") .. "}"
	end
end


local function encode_string(val)
	return '"' .. val:gsub('[%z\1-\31\\"]', escape_char) .. '"'
end


local function encode_number(val)
	-- Check for NaN, -inf and inf
	if val ~= val or val <= -math.huge or val >= math.huge then
		error("unexpected number value '" .. tostring(val) .. "'")
	end
	return string.format("%.14g", val)
end


local type_func_map = {
	["nil"] = encode_nil,
	["table"] = encode_table,
	["string"] = encode_string,
	["number"] = encode_number,
	["boolean"] = tostring
}


encode = function(val, stack)
	local t = type(val)
	local f = type_func_map[t]
	if f then
		return f(val, stack)
	end
	error("unexpected type '" .. t .. "'")
end


function json.encode(val)
	return (encode(val))
end

-------------------------------------------------------------------------------
-- Decode
-------------------------------------------------------------------------------

local parse

local function create_set(...)
	local res = {}
	for i = 1, select("#", ...) do
		res[select(i, ...)] = true
	end
	return res
end

local space_chars  = create_set(" ", "\t", "\r", "\n")
local delim_chars  = create_set(" ", "\t", "\r", "\n", "]", "}", ",")
local escape_chars = create_set("\\", "/", '"', "b", "f", "n", "r", "t", "u")
local literals     = create_set("true", "false", "null")

local literal_map  = {
	["true"] = true,
	["false"] = false,
	["null"] = nil,
}


local function next_char(str, idx, set, negate)
	for i = idx, #str do
		if set[str:sub(i, i)] ~= negate then
			return i
		end
	end
	return #str + 1
end


local function decode_error(str, idx, msg)
	local line_count = 1
	local col_count = 1
	for i = 1, idx - 1 do
		col_count = col_count + 1
		if str:sub(i, i) == "\n" then
			line_count = line_count + 1
			col_count = 1
		end
	end
	error(string.format("%s at line %d col %d", msg, line_count, col_count))
end


local function codepoint_to_utf8(n)
	-- http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=iws-appendixa
	local f = math.floor
	if n <= 0x7f then
		return string.char(n)
	elseif n <= 0x7ff then
		return string.char(f(n / 64) + 192, n % 64 + 128)
	elseif n <= 0xffff then
		return string.char(f(n / 4096) + 224, f(n % 4096 / 64) + 128, n % 64 + 128)
	elseif n <= 0x10ffff then
		return string.char(f(n / 262144) + 240, f(n % 262144 / 4096) + 128,
			f(n % 4096 / 64) + 128, n % 64 + 128)
	end
	error(string.format("invalid unicode codepoint '%x'", n))
end


local function parse_unicode_escape(s)
	local n1 = tonumber(s:sub(1, 4), 16)
	local n2 = tonumber(s:sub(7, 10), 16)
	-- Surrogate pair?
	if n2 then
		return codepoint_to_utf8((n1 - 0xd800) * 0x400 + (n2 - 0xdc00) + 0x10000)
	else
		return codepoint_to_utf8(n1)
	end
end


local function parse_string(str, i)
	local res = ""
	local j = i + 1
	local k = j

	while j <= #str do
		local x = str:byte(j)

		if x < 32 then
			decode_error(str, j, "control character in string")
		elseif x == 92 then -- `\`: Escape
			res = res .. str:sub(k, j - 1)
			j = j + 1
			local c = str:sub(j, j)
			if c == "u" then
				local hex = str:match("^[dD][89aAbB]%x%x\\u%x%x%x%x", j + 1)
					or str:match("^%x%x%x%x", j + 1)
					or decode_error(str, j - 1, "invalid unicode escape in string")
				res = res .. parse_unicode_escape(hex)
				j = j + #hex
			else
				if not escape_chars[c] then
					decode_error(str, j - 1, "invalid escape char '" .. c .. "' in string")
				end
				res = res .. escape_char_map_inv[c]
			end
			k = j + 1
		elseif x == 34 then -- `"`: End of string
			res = res .. str:sub(k, j - 1)
			return res, j + 1
		end

		j = j + 1
	end

	decode_error(str, i, "expected closing quote for string")
end


local function parse_number(str, i)
	local x = next_char(str, i, delim_chars)
	local s = str:sub(i, x - 1)
	local n = tonumber(s)
	if not n then
		decode_error(str, i, "invalid number '" .. s .. "'")
	end
	return n, x
end


local function parse_literal(str, i)
	local x = next_char(str, i, delim_chars)
	local word = str:sub(i, x - 1)
	if not literals[word] then
		decode_error(str, i, "invalid literal '" .. word .. "'")
	end
	return literal_map[word], x
end


local function parse_array(str, i)
	local res = {}
	local n = 1
	i = i + 1
	while 1 do
		local x
		i = next_char(str, i, space_chars, true)
		-- Empty / end of array?
		if str:sub(i, i) == "]" then
			i = i + 1
			break
		end
		-- Read token
		x, i = parse(str, i)
		res[n] = x
		n = n + 1
		-- Next token
		i = next_char(str, i, space_chars, true)
		local chr = str:sub(i, i)
		i = i + 1
		if chr == "]" then break end
		if chr ~= "," then decode_error(str, i, "expected ']' or ','") end
	end
	return res, i
end


local function parse_object(str, i)
	local res = {}
	i = i + 1
	while 1 do
		local key, val
		i = next_char(str, i, space_chars, true)
		-- Empty / end of object?
		if str:sub(i, i) == "}" then
			i = i + 1
			break
		end
		-- Read key
		if str:sub(i, i) ~= '"' then
			decode_error(str, i, "expected string for key")
		end
		key, i = parse(str, i)
		-- Read ':' delimiter
		i = next_char(str, i, space_chars, true)
		if str:sub(i, i) ~= ":" then
			decode_error(str, i, "expected ':' after key")
		end
		i = next_char(str, i + 1, space_chars, true)
		-- Read value
		val, i = parse(str, i)
		-- Set
		res[key] = val
		-- Next token
		i = next_char(str, i, space_chars, true)
		local chr = str:sub(i, i)
		i = i + 1
		if chr == "}" then break end
		if chr ~= "," then decode_error(str, i, "expected '}' or ','") end
	end
	return res, i
end


local char_func_map = {
	['"'] = parse_string,
	["0"] = parse_number,
	["1"] = parse_number,
	["2"] = parse_number,
	["3"] = parse_number,
	["4"] = parse_number,
	["5"] = parse_number,
	["6"] = parse_number,
	["7"] = parse_number,
	["8"] = parse_number,
	["9"] = parse_number,
	["-"] = parse_number,
	["t"] = parse_literal,
	["f"] = parse_literal,
	["n"] = parse_literal,
	["["] = parse_array,
	["{"] = parse_object,
}


parse = function(str, idx)
	local chr = str:sub(idx, idx)
	local f = char_func_map[chr]
	if f then
		return f(str, idx)
	end
	decode_error(str, idx, "unexpected character '" .. chr .. "'")
end


function json.decode(str)
	if type(str) ~= "string" then
		error("expected argument of type string, got " .. type(str))
	end
	local res, idx = parse(str, next_char(str, 1, space_chars, true))
	idx = next_char(str, idx, space_chars, true)
	if idx <= #str then
		decode_error(str, idx, "trailing garbage")
	end
	return res
end

return json
 end,
["library.server._exports"] = function(...) 
local ____exports = {}
do
    local ____handle_2Dmessage = require("library.server.handle-message")
    ____exports.handleMessage = ____handle_2Dmessage.default
end
return ____exports
 end,
["library.server"] = function(...) 
local ____exports = {}
local socket = require("socket")
local json = require("library._common.json")
local ____log = require("library.log")
local log = ____log.default
local _____exports = require("library.server._exports")
local handleMessage = _____exports.handleMessage
local appHost = "0.0.0.0"
local appPort = 21122
local modHost = "0.0.0.0"
local modPort = 21121
local connection
local server
server = {
    isReady = function() return connection ~= nil end,
    listen = function()
        if server:isReady() then
            local actualData = connection:receive()
            local data = actualData
            if data then
                handleMessage(data, server)
            end
            socket.sleep(0.001)
        else
            connection = socket.udp()
            connection:settimeout(0)
            connection:setsockname(modHost, modPort)
            connection:setpeername(appHost, appPort)
        end
    end,
    sendMessage = function(____, message)
        local messageJson
        do
            local function ____catch(____error)
                log("Failed to encode message")
                log(tprint(message))
                log(____error)
            end
            local ____try, ____hasReturned = pcall(function()
                messageJson = json.encode(message)
                local code, ____error = connection:send(messageJson)
            end)
            if not ____try then
                ____catch(____hasReturned)
            end
        end
        socket.sleep(0.001)
    end
}
____exports.default = server
return ____exports
 end,
["library._exports"] = function(...) 
local ____exports = {}
do
    local ____log = require("library.log")
    ____exports.log = ____log.default
end
do
    local ____queue = require("library.queue")
    ____exports.queue = ____queue.default
end
do
    local ____server = require("library.server")
    ____exports.server = ____server.default
end
return ____exports
 end,
["mod"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ObjectEntries = ____lualib.__TS__ObjectEntries
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local ____exports = {}
local _____exports_2Ets = require("library._exports")
local log = _____exports_2Ets.log
local queue = _____exports_2Ets.queue
local server = _____exports_2Ets.server
if love.update then
    local oldLoveUpdate = love.update
    love.update = function(...)
        oldLoveUpdate(...)
        server:listen()
    end
end
queue({function()
    if server:isReady() then
        server:sendMessage({test = "ready"})
        return true
    end
    return false
end})
G.E_MANAGER:add_event(
    Event({
        blocking = false,
        delay = 5,
        func = function()
            local currentState
            local stateEvent
            stateEvent = Event({
                blockable = false,
                blocking = false,
                delay = 1,
                func = function()
                    local state = G.STATE
                    if state ~= currentState then
                        currentState = state
                        local ____opt_0 = __TS__ArrayFind(
                            __TS__ObjectEntries(G.STATES),
                            function(____, ____bindingPattern0)
                                local value
                                local key = ____bindingPattern0[1]
                                value = ____bindingPattern0[2]
                                return value == state
                            end
                        )
                        local stateKey = ____opt_0 and ____opt_0[1]
                        if stateKey ~= nil then
                            log("STATE: " .. stateKey)
                            if server:isReady() then
                                server:sendMessage({
                                    content = tostring(stateKey),
                                    type = "state"
                                })
                            end
                        end
                    end
                    stateEvent.start_timer = false
                end,
                no_delete = true,
                pause_force = true,
                timer = "UPTIME",
                trigger = "after"
            })
            G.E_MANAGER:add_event(stateEvent)
            return true
        end,
        no_delete = true,
        trigger = "after"
    }),
    "other"
)
local ____SMODS_2 = SMODS
local Atlas = ____SMODS_2.Atlas
Atlas({key = "modicon", path = "balacomp.png", px = 34, py = 34})
return ____exports
 end,
}
return require("mod", ...)
