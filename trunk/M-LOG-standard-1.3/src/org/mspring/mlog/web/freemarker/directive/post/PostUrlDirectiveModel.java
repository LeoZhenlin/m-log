/**
 * 
 */
package org.mspring.mlog.web.freemarker.directive.post;

import java.io.IOException;
import java.util.Map;

import org.apache.log4j.Logger;
import org.mspring.mlog.entity.Post;
import org.mspring.mlog.web.freemarker.DirectiveUtils;
import org.mspring.mlog.web.freemarker.FreemarkerVariableNames;
import org.mspring.mlog.web.freemarker.directive.AbstractDirectiveModel;
import org.mspring.mlog.web.rulrewrite.PostRewriteRule;

import freemarker.core.Environment;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;

/**
 * @author Gao Youbo
 * @since 2012-8-9
 * @Description
 * @TODO 获取文章链接
 */
public class PostUrlDirectiveModel extends AbstractDirectiveModel {
    private static final Logger log = Logger.getLogger(PostUrlDirectiveModel.class);

    public static final String KEY = "post_url";

    /*
     * (non-Javadoc)
     * 
     * @see
     * org.mspring.mlog.web.freemarker.directive.AbstractDirectiveModel#getKey()
     */
    @Override
    public String getKey() {
        // TODO Auto-generated method stub
        return KEY;
    }

    /*
     * (non-Javadoc)
     * 
     * @see freemarker.template.TemplateDirectiveModel#execute(freemarker.core.
     * Environment, java.util.Map, freemarker.template.TemplateModel[],
     * freemarker.template.TemplateDirectiveBody)
     */
    @SuppressWarnings("rawtypes")
    @Override
    public void execute(Environment env, Map params, TemplateModel[] loopVars, TemplateDirectiveBody body) throws TemplateException, IOException {
        // TODO Auto-generated method stub
        // 获取当前模板变量中的文章对象
        String base = env.__getitem__(FreemarkerVariableNames.BASE).toString();

        Long id = DirectiveUtils.getLong("id", params);
        if (id != null) {
            String postUrl = PostRewriteRule.getPostUrl(new Post(id));
            env.getOut().append(base + postUrl);
        }
        else {
            Object postObj = env.__getitem__(FreemarkerVariableNames.POST);
            if (postObj != null && (postObj instanceof Post)) {
                Post post = (Post) postObj;
                String postUrl = PostRewriteRule.getPostUrl(post);
                env.getOut().append(base + postUrl);
            }    
        }
    }

}