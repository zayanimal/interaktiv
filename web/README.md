# Архитектура проекта

## Модуль
**Модуль** – архитектурный паттерн. Модуль содержит в себе контейнеры, компоненты и стор определённого раздела приложения. Содержимое модуля используется только в пределах данного модуля, дочерние элементы не должны использоваться за пределами модуля.

### Структура модуля

+ module-name/
    + /containers
    + /components
    + /store/
        + /actions
        + /reducers
        + /selectors
        + /sagas
    + /constants

Содержимое директорий находится в разделах:

- контейнеры и компоненты
- стор
- константы

## Контейнеры и компоненты
**Контейнер** – паттерн проектирования  React компонентов. Смысл в том, что только контейнер подключается к redux store, все его дочерние элементы (обычные компоненты) получают данные через свои пропсы.

### Структура контейнера
+ ContainerName/
    + index.js
    + ContainerName.jsx
    + ContainerName.scss

### Стиль кода
index.js:

```JSX
    export * from './ComponentName';
```

ContainerName.jsx:

```JSX
    import React from 'react';
    import PropTypes from 'prop-types';
    import { connect } from 'react-redux';
    import { entityNameAction } from '../store/actions';
    import { entityNameSelect } from '../store/selectors';

    const mapStateToProps = (state) => ({
        text: entityNameSelect.text(state),
    });

    const mapDispatchToProps = {
        change: entityNameAction.change,
    };

    const ContainerName = (props) => {
        const { text, change } = props;

        return <input type="text" value={text} onChange={change} />;
    };

    ContainerName.propTypes = {
        text: PropTypes.string,
        change: PropTypes.func.isRequired,
    };

    ContainerName.defaultProps = {
        text: '',
    };

    const ContainerNameConnected = connect(mapStateToProps, mapDispatchToProps)(ContainerName);

    export { ContainerNameConnected as ContainerName };
```

ContainerName.scss:

```
    .ContainerName {}
```

## Компоненты
**Компонент** – дочерний элемент контейнера. Получает данные только от своего родителя через props или context provider.

### Структура компонента

+ ComponentName/
    + index.js
    + ComponentName.jsx
    + ComponentName.scss


### Стиль кода

index.js:

```JSX
    export * from './ComponentName';
```

ComponentName.jsx:

```JSX
    import React from 'react';
    import PropTypes from 'prop-types';

    const ComponentName = (props) => {
        const { text, change } = props;

        return <input type="text" value={text} onChange={change} />;
    };

    ComponentName.propTypes = {
        text: PropTypes.string,
        change: PropTypes.func.isRequired,
    };

    ComponentName.defaultProps = {
        text: '',
    };

    export { ComponentName };
```

ComponentName.scss:

```
    .ComponentName {}
```

## Стор
**Стор** - хранилище данных Redux. Используется исключительно внутри модулей (см. раздел модуль) и хранит в себе текущий State сущности.

### Структура стора

+ store/
    + /actions
    + /reducers
    + /selectors
    + /sagas

### Actions

Директория содержит следующие файлы:

- index.js
- entityName1.actions.js
- entityName2.actions.js

#### Стиль кода

index.js:

```JSX
    import * as entityName1Actions from './entityName1.actions.js';
    import * as entityName2Actions from './entityName2.actions.js';

    export {
        entityName1Actions,
        entityName2Actions,
    };
```

entityName.actions.js (в createAction в квадратных скобках указывается - имя_модуля):

```JSX
    import { createAction } from 'redux-actions';

    export const toggle = createAction('[MODULE_NAME] ENTITY_NAME_TOGGLE');
    export const switch = createAction('[MODULE_NAME] ENTITY_NAME_SWITCH');
```

### Reducers

Директория содержит следующие файлы:

- index.js
- entityName1.reducer.js
- entityName2.reducer.js

#### Стиль кода

```JSX
    import { combineReducers } from 'redux';
    import { entityName1 } from './entityName1.reducer.js';
    import { entityName2 } from './entityName2.reducer.js';

    export const moduleName = combineReducers({
        entityName1,
        entityName2
    });
```

entityName.reducer.js:

```JSX
    import { handleActions } from 'redux-actions';
    import { entityNameActions } from '../actions';

    const initialState = {
        toggle: false,
        switch: false,
    };

    export const entityName = handleActions({
    [entityNameActions.toggle](state) {
        return {
            ...state,
            toggle: !state.toggle
        };
    },
    [entityNameActions.switch](state) {
        return {
            ...state,
            switch: !state.switch
        };
    },
    }, initialState);
```

### Selectors

Селекторы применяются для выборки и преобразования данных из стора.

Директория содержит следующие файлы:

- index.js
- entityName1.selectors.js
- entityName2.selectors.js

#### Стиль кода

index.js:

```JSX
    import * as entityName1Selectors from './entityName1.selectors.js';
    import * as entityName2Selectors from './entityName2.selectors.js';

    export {
        entityName1Selectors,
        entityName2Selectors,
    };
```

entityName.selectors.js:

```JSX
    export const entityName1 = (state) => state.entityName1;

    export const toggle = (state) => entityName1(state).toggle;

    export const switch = (state) => entityName1(state).switch;
```

### Sagas

Директория содержит следующие файлы:

- index.js
- getEntityName1Type.js
- setEntityName2Type.js

#### Именование файлов

Имя начинается с глагола, camel case.
Базовые варианты названий глаголов (get, set, update).

#### Стиль кода

index.js:

```JSX
    import { fork } from 'redux-saga/effects';
    import { getEntityName1TypeWatch } from './getEntityName1Type.js';
    import { setEntityName2TypeWatch } from './setEntityName2Type.js';

    export const moduleName = [
        fork(getEntityName1TypeWatch),
        fork(setEntityName2TypeWatch),
    ]
```

getEntityNameType.js:

```JSX
    function* getEntityNameType() {
        try {
            /** логика саги */
        } catch (error) {
            /** обработка ошибок */
        }
    }

    export function* getEntityNameTypeWatch() {
        /** прослушивание нужного экшена*/
    }
```

## Константы

Директория содержит следующие файлы:

- index.js
- entityName1.js
- entityName2.js

#### Стиль кода

index.js:

```JSX
    import * as ENTITY_NAME1 from './entityName1.js';
    import * as ENTITY_NAME2 from './entityName2.js';

    export {
        ENTITY_NAME1,
        ENTITY_NAME2,
    };
```

entityName1.js:

```JSX
    export const CONSTANT_NAME1 = 'files';

    export const CONSTANT_NAME2 = new Map([
        ['key', 'value']
    ]);
```
