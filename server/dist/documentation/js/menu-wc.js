'use strict';
customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }
    connectedCallback() {
        this.render(this.isNormalMode);
    }
    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">server documentation</a>
                </li>

                <li class="divider"></li>
                ${isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : ''}
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${isNormalMode ?
            'data-target="#modules-links"' : 'data-target="#xs-modules-links"'}>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"'}>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
            'data-target="#controllers-links-module-AppModule-0726194c4f0c760cc44630494eae4e9f"' : 'data-target="#xs-controllers-links-module-AppModule-0726194c4f0c760cc44630494eae4e9f"'}>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="controllers-links-module-AppModule-0726194c4f0c760cc44630494eae4e9f"' :
            'id="xs-controllers-links-module-AppModule-0726194c4f0c760cc44630494eae4e9f"'}>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/QuestionController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/QuizController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuizController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
            'data-target="#injectables-links-module-AuthModule-75e014dd60c204da5edab04a034a14f9"' : 'data-target="#xs-injectables-links-module-AuthModule-75e014dd60c204da5edab04a034a14f9"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-AuthModule-75e014dd60c204da5edab04a034a14f9"' :
            'id="xs-injectables-links-module-AuthModule-75e014dd60c204da5edab04a034a14f9"'}>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuestionModule.html" data-type="entity-link">QuestionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
            'data-target="#controllers-links-module-QuestionModule-e08fd0d06b079bbaf99710307705073e"' : 'data-target="#xs-controllers-links-module-QuestionModule-e08fd0d06b079bbaf99710307705073e"'}>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="controllers-links-module-QuestionModule-e08fd0d06b079bbaf99710307705073e"' :
            'id="xs-controllers-links-module-QuestionModule-e08fd0d06b079bbaf99710307705073e"'}>
                                            <li class="link">
                                                <a href="controllers/QuestionController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
            'data-target="#injectables-links-module-QuestionModule-e08fd0d06b079bbaf99710307705073e"' : 'data-target="#xs-injectables-links-module-QuestionModule-e08fd0d06b079bbaf99710307705073e"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-QuestionModule-e08fd0d06b079bbaf99710307705073e"' :
            'id="xs-injectables-links-module-QuestionModule-e08fd0d06b079bbaf99710307705073e"'}>
                                        <li class="link">
                                            <a href="injectables/QuestionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>QuestionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuizzModule.html" data-type="entity-link">QuizzModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
            'data-target="#controllers-links-module-QuizzModule-a5671a6f6bc9abb74e998fc42d5f57fb"' : 'data-target="#xs-controllers-links-module-QuizzModule-a5671a6f6bc9abb74e998fc42d5f57fb"'}>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="controllers-links-module-QuizzModule-a5671a6f6bc9abb74e998fc42d5f57fb"' :
            'id="xs-controllers-links-module-QuizzModule-a5671a6f6bc9abb74e998fc42d5f57fb"'}>
                                            <li class="link">
                                                <a href="controllers/QuizController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuizController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
            'data-target="#injectables-links-module-QuizzModule-a5671a6f6bc9abb74e998fc42d5f57fb"' : 'data-target="#xs-injectables-links-module-QuizzModule-a5671a6f6bc9abb74e998fc42d5f57fb"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-QuizzModule-a5671a6f6bc9abb74e998fc42d5f57fb"' :
            'id="xs-injectables-links-module-QuizzModule-a5671a6f6bc9abb74e998fc42d5f57fb"'}>
                                        <li class="link">
                                            <a href="injectables/QuizzService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>QuizzService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
            'data-target="#injectables-links-module-UserModule-41949970840961564d3d34e5b151d413"' : 'data-target="#xs-injectables-links-module-UserModule-41949970840961564d3d34e5b151d413"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-UserModule-41949970840961564d3d34e5b151d413"' :
            'id="xs-injectables-links-module-UserModule-41949970840961564d3d34e5b151d413"'}>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#classes-links"' :
            'data-target="#xs-classes-links"'}>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"'}>
                            <li class="link">
                                <a href="classes/JwtGaurd.html" data-type="entity-link">JwtGaurd</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewQuestionDto.html" data-type="entity-link">NewQuestionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewQuizDto.html" data-type="entity-link">NewQuizDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionAttemptEntity.html" data-type="entity-link">QuestionAttemptEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionEntity.html" data-type="entity-link">QuestionEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuizAttemptGateway.html" data-type="entity-link">QuizAttemptGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuizzAttemptEntity.html" data-type="entity-link">QuizzAttemptEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuizzEntity.html" data-type="entity-link">QuizzEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateQuestionDto.html" data-type="entity-link">UpdateQuestionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEntity.html" data-type="entity-link">UserEntity</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#guards-links"' :
            'data-target="#xs-guards-links"'}>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"'}>
                            <li class="link">
                                <a href="guards/WsGuard.html" data-type="entity-link">WsGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#interfaces-links"' :
            'data-target="#xs-interfaces-links"'}>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"'}>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link">JwtPayload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#miscellaneous-links"'
            : 'data-target="#xs-miscellaneous-links"'}>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"'}>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
//# sourceMappingURL=menu-wc.js.map