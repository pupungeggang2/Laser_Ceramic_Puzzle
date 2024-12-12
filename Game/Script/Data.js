const dataLevel = {
    'Hub': {
        'Name': 'Hub',
        'Size': [20, 20],
        'Wall': [

        ],
        'Floor': [
            {'Type': 'Connection', 'Position': [3, 1], 'Properties': 'Tutorial1'},
            {'Type': 'Connection', 'Position': [3, 3], 'Properties': 'Tutorial2'},
            {'Type': 'Connection', 'Position': [3, 5], 'Properties': 'Tutorial3'},
            {'Type': 'Connection', 'Position': [3, 7], 'Properties': 'Tutorial4'},
        ],
        'Thing': [

        ],
        'Start': [1, 1],
        'Goal': [4, 7]
    },

    'Tutorial1': {
        'Name': 'Tutorial1',
        'Size': [8, 8],
        'Wall': [
            [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
            [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
            [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
            [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7],
            [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5]
        ],
        'Floor': [

        ],
        'Thing': [

        ],
        'Start': [1, 1],
        'Goal': [6, 6]
    },

    'Tutorial2': {
        'Name': 'Tutorial2',
        'Size': [8, 8],
        'Wall': [
            [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
            [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
            [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
            [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7],
            [2, 5], [2, 6], [4, 5], [4, 6]
        ],
        'Floor': [
            
        ],
        'Thing': [
            {'Type': 'Box', 'Position': [3, 4], 'Solid': false, 'Pushable': false, }
        ],
        'Start': [3, 1],
        'Goal': [3, 6],
    },

    'Tutorial3': {
        'Name': 'Tutorial3',
        'Size': [8, 8],
        'Wall': [
            [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
            [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
            [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
            [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7],
            [5, 5], [5, 6],
        ],
        'Floor': [
            {'Type': 'PressureButton', 'Position': [5, 6], 'Solid': false},
            {'Type': 'Gate', 'Position': [6, 4], 'Solid': true, 'State': 'Closed'}
        ],
        'Thing': [
            {'Type': 'Box', 'Position': [2, 4], 'Solid': false, 'Pushable': true},
        ],
        'Start': [3, 1],
        'Goal': [6, 6],
    }
}