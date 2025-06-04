
const [container] = utils.$('.scroll-container');
const debug = true;

// Animation

animate('.square', {
    rotateY: ['-1turn', '15deg'],
    rotateX: [0, '19deg'],
    rotatez: [0, '19deg'],
    scale: [0, 1],
    ease: 'inOut(1)',

    autoplay: onScroll({
        container: '.container',
        target: '.section',
        axis: 'y',
        enter: 'bottom top',
        leave: 'top bottom',
        sync: 'inOutExpo',            // * ├─ Synchronisation Mode
        onEnter: () => { },
        onLeave: () => { scene1(); console.log("Первая сцена завершена") },
        onUpdate: () => { },

        debug: true
    })
});

function scene1()
{
    animate('.square', {
            scale: [1, 50],
            ease: 'inExpo',

            opacity:
            {
                delay: 1000,
                to: 0
            },

            onComplete: () => { document.getElementById('first').remove(); }
        }
    );
}

/*animate('.square', {


    autoplay: onScroll({
        container: '.container',
        target: '.section',
        axis: 'y',
        enter: 'bottom -100%',
        leave: 'start -200%',
        sync: 'inOutCirc',            // * ├─ Synchronisation Mode
        onEnter: () => { },
        onLeave: () => { },
        onUpdate: () => { },

        debug: true
    })
});*/

